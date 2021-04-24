[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Docker Keycloak

```bash
make build
```

Enable HTTPS/SSL with a Reverse Proxy

Assuming that your reverse proxy doesn’t use port 8443 for SSL you also need to configure what port HTTPS traffic is redirected to.

```xml
<subsystem xmlns="urn:jboss:domain:undertow:3.0">
    ...
    <http-listener name="default" socket-binding="http"
        proxy-address-forwarding="true" redirect-socket="proxy-https"/>
    ...
</subsystem>
```

Add the redirect-socket attribute to the http-listener element. The value should be proxy-https which points to a socket binding you also need to define.

Then add a new socket-binding element to the socket-binding-group element:

```xml
<socket-binding-group name="standard-sockets" default-interface="public"
    port-offset="${jboss.socket.binding.port-offset:0}">
    ...
    <socket-binding name="proxy-https" port="443"/>
    ...
</socket-binding-group>
```

## See Also

+ https://www.keycloak.org/docs/1.9/server_installation_guide/topics/clustering/load-balancer.html
+ http://lists.jboss.org/pipermail/keycloak-user/2017-December/012487.html
+ https://github.com/Codingpedia/codingmarks-api/wiki/Keycloak-Setup-for-Production
+ https://www.keycloak.org/docs/latest/server_installation/index.html#_setting-up-a-load-balancer-or-proxy
+ https://stackoverflow.com/questions/47068266/keycloak-docker-behind-loadbalancer-with-https-fails
+ https://stackoverflow.com/questions/47181821/using-keycloak-behind-a-reverse-proxy-could-not-open-admin-loginpage-because-mi