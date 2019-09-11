package k8s

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/datalayer/datalayer/apps/kuber/log"
	"github.com/datalayer/datalayer/apps/kuber/util"
	"github.com/kris-nova/kubicorn/apis/cluster"
	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/fields"
	"k8s.io/client-go/kubernetes"
	v1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

var config *rest.Config

func init() {
	config, _ = GetConfig()
}

const (
	retryAttempts     = 150
	retrySleepSeconds = 5
)

func GetConfig() (*rest.Config, error) {

	var config *rest.Config
	var err error

	if _, err := os.Stat("/var/run/secrets/kubernetes.io/serviceaccount/token"); os.IsNotExist(err) {
		var kubeconfig *string
		if home := util.GetUserHome(); home != "" {
			kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
		} else {
			kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
		}
		flag.Parse()

		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		//		if err != nil {
		//			panic(err.Error())
		//		}

	} else {

		config, err = rest.InClusterConfig()
		if err != nil {
			panic(err.Error())
		}

	}

	return config, err

}

var theConfig *rest.Config = nil

func GetConfig2() (*rest.Config, error) {

	if theConfig != nil {
		return theConfig, nil
	}

	config, err := rest.InClusterConfig()
	if err != nil {
		log.Warnf("Cannot use service account from /var/run/secrets/kubernetes.io/serviceaccount/" +
			corev1.ServiceAccountTokenKey + ") fallback to config file")
	}
	if config == nil {
		var kubeconfig *string
		if home := util.GetUserHome(); home != "" {
			kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "path to kubeconfig file")
		}
		log.Info("Use kubernetes config: %s", *kubeconfig)
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			panic(err.Error())
		}
	}
	theConfig = config
	return config, err
}

func GetPods(namespace string) *corev1.PodList {
	podClient := GetPodClient(namespace)
	opts := metav1.ListOptions{}
	pods, _ := podClient.List(opts)
	return pods
}

func GetPodClient(namespace string) v1.PodInterface {
	if namespace == "" {
		namespace = metav1.NamespaceDefault
	}
	clientSet, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}
	podClient := clientSet.CoreV1().Pods(namespace)
	return podClient
}

func FindNode(name string, nodes []corev1.Node) *corev1.Node {
	for _, node := range nodes {
		if node.Name == name {
			return &node
		}
	}
	return nil
}

func GetNodes(region string) *corev1.NodeList {
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}
	nodes, err := clientset.CoreV1().Nodes().List(metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}
	return nodes
}

func TagK8SWorkers(region string) {
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}
	nodes, err := clientset.CoreV1().Nodes().List(metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}
	for _, node := range nodes.Items {
		if node.Labels["datalayer-role"] != "master" {
			fmt.Println(node.Name)
			l := node.Labels
			l["datalayer-role"] = "worker"
			node.SetLabels(l)
			clientset.CoreV1().Nodes().Update(&node)
		}
	}
}

func ListPodsOnNode(ListPodsOnNode func(opts metav1.ListOptions) (*corev1.PodList, error), node corev1.Node) []corev1.Pod {
	log.Info("List the Pods on node: %s", node.Name)
	podsOnNode, err := ListPodsOnNode(metav1.ListOptions{FieldSelector: fields.SelectorFromSet(fields.Set{"spec.nodeName": node.Name}).String()})
	if err != nil {
		log.Errorf("Failed to list Pods on node: %s", node.Name)
		return nil
	}
	return podsOnNode.Items
}

func LogPods(podGroups map[string][]corev1.Pod) {
	for _, pods := range podGroups {
		for _, pod := range pods {
			log.Info("%s\t%s\t%s\t%s", pod.Name, pod.Status.Phase, pod.Status.PodIP, pod.Spec.NodeName)
		}
	}
}

func GroupPods(pods []corev1.Pod) (podGroup map[string][]corev1.Pod) {
	podGroup = make(map[string][]corev1.Pod)
	for _, pod := range pods {
		groupName := GetPodGroupName(&pod)
		if groupName != nil {
			podGroup[*groupName] = append(podGroup[*groupName], pod)
			log.Info("Pod map: %s", podGroup)
		}
	}
	return podGroup
}

func GetPodGroupName(pod *corev1.Pod) *string {
	generatedName := pod.GenerateName
	if len(generatedName) > 0 {
		generatedName = generatedName[0 : len(generatedName)-1]
		return &generatedName
	}
	return nil
}

func RetryGetConfigWithSsh(existing *cluster.Cluster, confDir string) (string, error) {
	for i := 0; i <= retryAttempts; i++ {
		path, err := GetConfigWithSsh(existing, confDir)
		log.Info(path)
		if err != nil {
			if strings.Contains(err.Error(), "file does not exist") || strings.Contains(err.Error(), "getsockopt: connection refused") || strings.Contains(err.Error(), "unable to authenticate") {
				log.Debug("Waiting for Kubernetes to come up..")
				time.Sleep(time.Duration(retrySleepSeconds) * time.Second)
				continue
			}
			return "", err
		}
	}
	return "", fmt.Errorf("Timeout writing kubeconfig")
}

func GetConfigWithSsh(existing *cluster.Cluster, confDir string) (string, error) {
	user := existing.SSH.User
	pubKeyPath := util.Expand(existing.SSH.PublicKeyPath)
	privKeyPath := strings.Replace(pubKeyPath, ".pub", "", 1)
	address := fmt.Sprintf("%s:%s", existing.KubernetesAPI.Endpoint, "22")
	if confDir == "" {
		confDir = fmt.Sprintf("./statestore/%s/", existing.Name)
	}
	localPath, err := GetKubeConfigPath(confDir)
	if err != nil {
		return "", err
	}
	if err != nil {
		return "", err
	}
	sshConfig := &ssh.ClientConfig{
		User:            user,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}
	remotePath := ""
	if user == "root" {
		remotePath = "/root/.kube/config"
	} else {
		remotePath = fmt.Sprintf("/home/%s/.kube/config", user)
	}
	agent := util.SshAgent()
	if agent != nil {
		auths := []ssh.AuthMethod{
			agent,
		}
		sshConfig.Auth = auths
	} else {
		pemBytes, err := ioutil.ReadFile(privKeyPath)
		if err != nil {

			return "", err
		}
		signer, err := util.GetSigner(pemBytes)
		if err != nil {
			return "", err
		}
		auths := []ssh.AuthMethod{
			ssh.PublicKeys(signer),
		}
		sshConfig.Auth = auths
	}
	sshConfig.SetDefaults()
	conn, err := ssh.Dial("tcp", address, sshConfig)
	if err != nil {
		return "", err
	}
	defer conn.Close()
	c, err := sftp.NewClient(conn)
	if err != nil {
		return "", err
	}
	defer c.Close()
	r, err := c.Open(remotePath)
	if err != nil {
		return "", err
	}
	defer r.Close()
	bytes, err := ioutil.ReadAll(r)
	if err != nil {
		return "", err
	}
	if _, err := os.Stat(localPath); os.IsNotExist(err) {
		empty := []byte("")
		err := ioutil.WriteFile(localPath, empty, 0755)
		if err != nil {
			return "", err
		}
	}
	f, err := os.OpenFile(localPath, os.O_WRONLY, os.ModeAppend)
	if err != nil {
		return "", err
	}
	_, err = f.WriteString(string(bytes))
	if err != nil {
		return "", err
	}
	defer f.Close()
	log.Info("Wrote kubeconfig to [%s]", localPath)

	//TODO better solution
	config, err := clientcmd.BuildConfigFromFlags("", localPath)

	ioutil.WriteFile(confDir+"/client-key-data.pem", config.KeyData, 0644)
	ioutil.WriteFile(confDir+"/client-certificate-data.pem", config.CertData, 0644)
	ioutil.WriteFile(confDir+"/certificate-authority-data.pem", config.CAData, 0644)

	return localPath, nil
}

func GetKubeConfigPath(path string) (string, error) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		if err := os.Mkdir(path, 0777); err != nil {
			return "", err
		}
	}
	return fmt.Sprintf("%s/config", path), nil
}
