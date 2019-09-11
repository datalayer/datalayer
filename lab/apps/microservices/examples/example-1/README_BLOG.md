# Developing microservices with minikube step by step

https://medium.com/@yzhong.cs/developing-microservices-with-minikube-81b31e5366ac

Yuchen Zhong - Apr 22 · 13 min read

Within the last 5 years, Kubernetes has received 2k+ contributors and 50k+ stars on Github 🌟⭐.

Number of stars overtime https://github.com/kubernetes/kubernetes

This blog post will go through some of the basics behind managing micro-services using Kubernetes. We’ll be using minikube, which allows us to run Kubernetes locally.

For the purpose of this blog, we’ll only create 3 services: auth, gateway, books.

+ auth is responsible for user authentication.
+ gateway handles all requests from the client.
+ books handles book lookup by id.

A user will make a request (with a book_id) to gateway, which will then check the forward the auth token from the request to auth for validation. If it is valid, it then returns the detail book information. Otherwise, it returns 403.

For people that do not like reading and just want to read the final code:

https://github.com/yzhong52/microservices-demo

## Prerequisites

Install the following: kubectl, docker, minikube, virtualbox.

brew update
brew install kubectl
brew cask install docker
brew cask install minikube
brew cask install virtualbox

And let’s double check and make sure they are all installed properly.

kubectl version --client
docker --version
docker-compose --version
docker-machine --version
minikube version

Let’s start the minikube cluster. It will take a while, expecting output below.

$ minikube start
😄  minikube v1.0.0 on darwin (amd64)
🤹  Downloading Kubernetes v1.14.0 images in the background ...
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
📶  "minikube" IP address is 192.168.99.100
🐳  Configuring Docker as the container runtime ...
🐳  Version of container runtime is 18.06.2-ce
⌛  Waiting for image downloads to complete ...
✨  Preparing Kubernetes environment ...
💾  Downloading kubeadm v1.14.
💾  Downloading kubelet v1.14.0
🚜  Pulling images required by Kubernetes v1.14.0 ...
🚀  Launching Kubernetes v1.14.0 using kubeadm ... 
⌛  Waiting for pods: apiserver proxy etcd scheduler controller dns
🔑  Configuring cluster permissions ...
🤔  Verifying component health .....
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!

A node in Kubernetes is a worker machine. In this case, it is created as a virtual machine using VirtualBox.

$ kubectl get nodes
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     master    40s        v1.14.0

There is only one worker node. So far, minikube does not support multi-nodes cluster. However, for local development purposes, a single node cluster is enough.

That’s all we need for now. Let’s move on to building apps.

## Building Stater App

We’ll build our services with TypeScript. If you are already super familiar with npm and TypeScript, you should skip this section to go straight to deployment section.

The easiest way to install TypeScript is through npm, the Node.js Package Manager. If you have npm installed, you can install TypeScript globally (-g) on your computer by:

npm install -g typescript

Double check and make sure it is installed properly.

$ tsc --version
Version 3.4.4

Now initialized our first service.

$ mkdir gateway
$ cd gateway

Initialize node project npm init. You may want to fill out these two properties: author and repository, but leaving them as empty is fine. For everything else, we leave them as default.

$ npm init

This utility will walk you through creating a package.json file.

...
Is this OK? (yes)
Initialize TypeScript configurations.
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
We should have these two files being generated package.json and tsconfig.json.
package.json
{
  "name": "gateway",
  "version": "1.0.0",
  "description": "Gateway",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}

We’ll install a few more dependencies.

npm install typescript
npm install express
npm install @types/express

We should see these being added to the package.json file.

"dependencies": {
    "@types/express": "^4.16.1",
    "express": "^4.16.4",
    "typescript": "^3.4.4"
}

Now, let’s create a hello-world service index.ts under src folder. All it does for now is listening to port 8080 and response “Hello World”.

src/index.ts
import express from 'express';
const app = express();
const port = 8080;
app.get('/api/v1/hey', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Listening on port ${port}!`));

Before running the service, we need to make some minor modifications to our package.json and tsconfig.json. For package.json, we delete test under script and add build and serve as the following. For this tutorial, we don’t have any tests to run.

build transpile TypeScript to Javascript

serve runs the service

"scripts": {
    "build": "tsc",
    "serve": "node dist/index.js"
},

For tsconfig.json, we add outDir and include.
outDir specifies the output folder for the transpiled JavaScript files
include is the location for our TypeScript files

{
  "compilerOptions": {
    ...
    "outDir": "dist",
  },
  "include": [
    "src/**/*.ts"
  ]
}

That’s it. Let’s build and start the server.

$ npm run build
$ npm run serve

Listening on port 8080!

And test it out.

$ curl http://localhost:8080/api/v1/hey
Hello World!

So far, we have this server running on our localhost port 8080. In the next section, we will deploy this into our minikube cluster.

## Deployment

Create a docker file.

Dockerfile
FROM node:8-slim
WORKDIR /server
COPY package*.json ./
RUN npm install
EXPOSE 8080
COPY . .
RUN npm run build
CMD npm run serve

Build the docker image.

$ docker build ./ -t gateway

Run the image.

docker run -d -it -p 3000:8080 gateway

By default, the container does not publish any of its ports to the outside world. To make a port available to services outside of Docker, we use -p 3000:8080 to map the container port 8080 to port 3000 on the host machine.

Double check that it is running.

$ docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}"
CONTAINER ID        IMAGE               PORTS
2a028218cc70        gateway:v1          0.0.0.0:3000->8080/tcp

Notice that I am using --format from time to time here. It is just for the blog post. You can simply use docker ps for the complete output.

And test it out.

$ curl localhost:3000/api/v1/hey
Hello World!

Stop it for now as we’ll run this docker image inside our minikube cluster later.

Replace the container id based on the output from docker ps.

docker stop 2a028218cc70

So far, whatever we did above are all on our local machine. We’ll move on to minikube from now on. Minikube comes with its own docker daemon. To be able to work with the docker daemon on our host:

eval $(minikube docker-env)

And make sure the docker daemon is running and we can see that the image list is empty at the moment.

$ docker images

Similarly, we build this image again inside the minikube docker daemon.

$ docker build ./ -t gateway
$ docker images --format "table {{.ID}}\t{{.Tag}}\t{{.Repository}}"
IMAGE ID            TAG                 REPOSITORY
677cdf924176        latest              gateway

To deploy this image using kubectl, we’ll use the deployment file.

Notice that we have a number of Kubenetes images as well which are managed by minikube. We can ignore them.

We’ll now create a deployment file which will deploy this image in our minikube cluster.

gateway-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gateway-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gateway-app
  template:
    metadata:
      labels:
        app: gateway-app
    spec:
      containers:
      - name: gateway-container
        image: gateway:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 8080

This deployment file specifies a few things.

The name of the deployment is gateway-deployment

2. The selector defines how the Deployment finds which Pods to manage. In this case, we simply select a label that is defined in the Pod template. That’s what the twogateway-app fields are for.

3. Finally, we specify the docker image and version gateway:latest. The imagePullPolicy is set to Never since we built the image locally.

$ kubectl create -f gateway-deployment.yaml

deployment.apps/gateway-deployment created

The above deployment file is more or less equivalent to running this command directly:kubectl run gateway-deployment --image=gateway:latest --port=8080 --label "app=gateway-app".

Our gateway is now deployed with Kubernetes as a Pod. A pod is the smallest deployment unit which can contain one or multiple container images. To check our running pods:

$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   
gateway-deployment-f85d876f8-zw24j   1/1     Running   0

Each Pod is assigned an IP address that is internal to the Kubernetes cluster, which means this IP is not accessible from outside of Kubernetes. We can check IP address for the pod.

$ kubectl get pods -o=custom-columns=NAME:.metadata.name,IP:.status.podIP
NAME                                 IP
gateway-deployment-f85d876f8-zw24j   172.17.0.4

Remember from earlier that we have a single worker node running with minikube. We can ssh into the worker node with minikube ssh. From within this node, we curl that IP address to verify that the running gateway pod. Don’t forget the replace the IP address below with the actual IP address of you running pod.

$ minikube ssh
                         _             _            
            _         _ ( )           ( )           
  ___ ___  (_)  ___  (_)| |/')  _   _ | |_      __  
/' _ ` _ `\| |/' _ `\| || , <  ( ) ( )| '_`\  /'__`\
| ( ) ( ) || || ( ) || || |\`\ | (_) || |_) )(  ___/
(_) (_) (_)(_)(_) (_)(_)(_) (_)`\___/'(_,__/'`\____)

$ curl 172.17.0.4:8080/api/v1/hey
Hello World!
$ exit

Cool, everything looks good so far 👌.

However, with Kubenetes, we don’t normally talk to a pod directly. Pods have ephemeral IP addresses. When Kubenetes kills a pod because of new deployment or a crash, its IP address may change. Apart from that, it will be very challenging if pods would have dependencies on each other and we will have to maintain those IP addresses. We have another layer of abstraction on top of Pod, which is called Service. Whenever pods need to communicate with each other, they always do that via Services. A Kubenetes Service is basically an abstraction of a logical set of Pods which allows service discovery easily and reliably.

Now create a gateway-service.yaml file:

kind: Service
apiVersion: v1
metadata:
  name: gateway-service
spec:
  type: NodePort
  selector:
    app: gateway-app
  ports:
  - name: gateway-service
    protocol: TCP
    port: 80
    targetPort: 8080

The selector should match the label defined in our gateway-deployment.yaml file earlier, which is app: gateway-app. This Service object will route requests to any Pod with this label (in our case, there is only one). The service type that we are using is NodePort. Apart from this, there are three more types: ClusterIP, LoadBalancer, and ExternalName. Service with ClusterIP type is only accessible from within the cluster, which is more suitable for services that we never need to talk to them directly. One example is a database service. LoadBalancer and ExternalName are only useful when deploying to a real cluster. For more details about service types, check out the publishing-services-service-types doc.

$ kubectl apply -f gateway-service.yaml
                                                                                                  service/gateway-service created
We can now talk the Service instead of the Pod.

Don’t forget the replace the IP address 10.108.60.167 below with the actual IP address of your running Service.

$ kubectl get services -o=custom-columns=NAME:.metadata.name,IP:.spec.clusterIP
NAME              IP
gateway-service   10.108.60.167
kubernetes        10.96.0.1

$ minikube ssh
                         _             _            
            _         _ ( )           ( )           
  ___ ___  (_)  ___  (_)| |/')  _   _ | |_      __  
/' _ ` _ `\| |/' _ `\| || , <  ( ) ( )| '_`\  /'__`\
| ( ) ( ) || || ( ) || || |\`\ | (_) || |_) )(  ___/
(_) (_) (_)(_)(_) (_)(_)(_) (_)`\___/'(_,__/'`\____)
$ curl 10.108.60.167:80/api/v1/hey
Hello World!
$ exit

But that’s still querying our service within the minikube node (which is what minikube ssh does). Is it possible to do that outside of the nodes? Yes, it is. It is basically what the NodePort service type does — it opens a port on the worker node which allows us to talks to the service that way.

$ minikube status
host: Running
kubelet: Running
apiserver: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.64.9

$ minikube service gateway-service --url
http://192.168.64.9:30975
$ curl http://192.168.64.9:30975/api/v1/hey
Hello World!

Remember we mentioned earlier that there is a single VM running in our minikube cluster? From here, using minikube status we can see that the IP address of the VM is 192.168.64.9. The URL for our gateway-service is 192.168.64.9:30975, which means that we could talk to this service on our minikube worker node at port 30975.

## Kubenetes Service ports

This diagram shows all the IPs and ports in our minikube cluster. We have a Pod running with this IP address 172.17.0.4, which contains our little hello-word docker image. We refer to this IP address as the podIp. It is listening to port 8080 and will return a simple message “Hello world” at the endpoint api/v1/hey. We then have a Service. The Service is a virtual server inside the node. That’s why it has its own IP address 10.108.60.167 and its own port 80. We refer to this IP as the clusterIp of the Service. From the Service point of view, the port on the Pod is known as the TargetPort, since that’s the port it will forward the requests to. And finally, we have a port 30975 (a.k.a. NodePort) on our worker node, which allows us to access the service outside of the cluster.

So far, we have one service running. In the next section, we will deploy multiple services and will see how the services communicate with each other.

Check out the starter branch of this repo for what we have so far:
https://github.com/yzhong52/microservices-demo/tree/starter

## Multi-service deployment and service discovery

Let’s create two more services: auth and books.

auth/src/index.ts:

It will check the authorization token. If it matches our super secure auth token, then it returns {ok: true}; otherwise, it returns {ok: false}.

import express from 'express';
const app = express();
const port = 8080;
app.use((req, res) => {
  if (req.get('authorization') === 'ASUPERSECUREAUTTHTOKEN') {
    res.json({
      ok: true
    })
  } else {
    res.status(403).json({
      ok: false
    })
  }
})
app.listen(port, () => console.log(`Listening on port ${port}!`));

We skip the package.json, tsconfig.json, Dockerfile, auth-deployment.yaml, and auth-service.yaml files since they are similar to the gateway in the previous section.

books/src/index.ts:

To keep things simple, we don’t really have a database of books. For whatever request that is made to the /api/v1/book/:id endpoint, we always return the same book.

“An Absolutely Remarkable Thing” is just the book that I am reading lately, which has absoltuely nothing to to with the topics here.

import express from 'express';
const app = express();
const port = 8080;
app.get('/api/v1/book/:id', (req, res) => {
 res.json({
  "book_id": req.params.id,
  "title": "An Absolutely Remarkable Thing",
  "auther": "Hank Green",
  "published_date": "September 25th, 2018"
 })
});
app.listen(port, () => console.log(`Listening on port ${port}!`));

We skip the package.json, tsconfig.json, Dockerfile, books-deployment.yaml, and books-service.yaml files since they are similar to the gateway in the previous section.

gateway/src/index.ts:

We’ll modify the original gateway to the following:

import express from 'express';
import * as request from "request-promise";
const app = express();
const port = 8080;
app.get('/api/v1/hey', (req, res) => res.send('Hello World!'));
app.get("/api/v1/book/:id", async (req, res) => {
  const headers = { headers: { authorization: req.get('authorization') } }
  request.get('http://auth-service.default.svc.cluster.local', headers)
    .then((data) => {
      request.get(`http://books-service.default.svc.cluster.local/api/v1/book/${req.params.id}`)
        .then(book => {
          res.send(book)
        }).catch(err => {
          res.status(401).send("Book not found")
        })
    }).catch(err => {
      res.status(403).send("Access denied")
    })
})
app.listen(port, () => console.log(`Listening on port ${port}!`));

We added an endpoint /api/v1/book/:id that actually does something useful. It will first authenticate the request by sending a request to auth-service. If it is authenticated, it will then make a request to books-service asking for details for the book given id. There are two ways to do service discovery within a Kubernete cluster: environment variable and DNS lookup. The later is strongly recommended over the former, which is also what we are using here. Every service defined in the cluster is assigned a DNS name by Kubenetes. That’s why these two URL works:

http://auth-service.default.svc.cluster.local
http://books-service.default.svc.cluster.local

For more details about how service discovery, check out the [discovering-services](https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services) doc.

Before we can deploy the whole universe, we’ll install a few more dependencies for gateway which are used by the new code.

cd gateway

npm install request
npm install request-promise
npm install @types/request-promise

Check out the mastter branch of this repo for what we have so far:

https://github.com/yzhong52/microservices-demo

And now let’s deploy everything 🌐!

$ docker build ./auth -t auth
$ kubectl apply -f auth/auth-deployment.yaml
$ kubectl apply -f auth/auth-service.yaml
$ docker build ./books -t books
$ kubectl apply -f books/books-deployment.yaml
$ kubectl apply -f books/books-service.yaml
$ docker build ./gateway -t gateway
$ kubectl delete pods -l app=gateway-app

Notice that for the gateway, we don’t need to need to recreate the deployment and service. We simply delete the pod, which will then result in a new pod being created with the new docker image.

## Let’s test it out!

$ curl $(minikube service gateway-service --url)/api/v1/book/1 -H "authorization: ASUPERSECUREAUTTHTOKEN" | jq
{
  "book_id": "1",
  "title": "An Absolutely Remarkable Thing",
  "auther": "Hank Green",
  "published_date": "September 25th, 2018"
}

And it works 🎉! We just talk to our gateway service with ASUPERSECUREAUTTHTOKEN and it retrieves the information about the book for us.

If you don’t have the books deployed properly, you may see Book not found. If you don’t have the auth deployed properly, you may see Access denied.

## Summary

We have created 3 simply services: gateway, auth, and books. The gateway is the entry point for our client application. It makes requests to the other two services to restrive addiction information. We build our apps with TypeScript and Node.js.

But in reality, the tech stack is not important here. Kubernete and Container together really make it extremely easy to develop microservices regardless of what tech stack we use, regardless whether it is Node.js app written in TypeScript, or a Spring app written in Java, or a Flask app written in Python, or a Play app written in Scala. We can deploy the app with Kubernetes the same way. We also went through some basic usage of Docker.

We touched upon some important Kubernete concepts such as Deployment, Pod and Service. And we’ve been using minikube to launch a single node cluster locally. We discussed briefly how service discovery works within our Kubenetes cluster using NDS lookup.

Finally, let’s look at the dashboard to have an overview of what we’ve built.
minikube dashboard

And that’s all ⚓. Thanks for reading.

## Mess up something in the middle and want to start over?

minikube stop
minikube delete
rm -rf ~/.minikube ~/.kube

## References

📖 https://github.com/kubernetes/minikube
📖 https://github.com/kubernetes/kubernetes
🧵 Emulate multiple nodes in minikube
📖 Local Kubernetes setup on macOS with minikube on VirtualBox
⚒ https://github.com/larkintuckerllc/hello-nodejs-typescript
📖 Getting started with microservices and Kubernetes
📖 Kubernetes Services: Exposed!
🎥 Kubernetes: DNS and Name Discovery
📖 Kubernetes best practices: mapping external services
