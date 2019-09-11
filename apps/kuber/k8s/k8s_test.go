package k8s

import (
	"flag"
	"fmt"
	"path/filepath"
	"testing"
	"time"

	"github.com/datalayer/datalayer/apps/kuber/util"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/kubernetes/staging/src/k8s.io/apimachinery/pkg/api/errors"
)

func TestGetConfig(t *testing.T) {
	c, err := GetConfig()
	if err != nil {
		panic(err)
	}
	fmt.Println(*c)
	t.Log(c.Host)
}

func TestGetKubeConfigPath(t *testing.T) {
	path, err := GetKubeConfigPath(util.GetUserHome() + "/.kube")
	if err != nil {
		panic(err)
	}
	fmt.Println(path)
}

func TestGetPodClient(t *testing.T) {
	c, err := GetConfig()
	if err != nil {
		panic(err)
	}
	pc := GetPodClient("default", c)
	fmt.Println(pc)
}

func TestAccess(t *testing.T) {
	var kubeconfig *string
	if home := util.GetUserHome(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()
	// Use the current context in kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err.Error())
	}
	// Create the clientset.
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}
	for {
		pods, err := clientset.CoreV1().Pods("").List(metav1.ListOptions{})
		if err != nil {
			panic(err.Error())
		}
		fmt.Printf("There are %d pods in the cluster\n", len(pods.Items))
		for _, pod := range pods.Items {
			fmt.Println(pod.Name)
		}
		// Examples for error handling:
		// - Use helper functions like e.g. errors.IsNotFound()
		// - And/or cast to StatusError and use its properties like e.g. ErrStatus.Message
		namespace := "default"
		pod := pods.Items[0].Name
		_, err = clientset.CoreV1().Pods(namespace).Get(pod, metav1.GetOptions{})
		if errors.IsNotFound(err) {
			fmt.Printf("Pod %s in namespace %s not found\n", pod, namespace)
		} else if statusError, isStatus := err.(*errors.StatusError); isStatus {
			fmt.Printf("Error getting pod %s in namespace %s: %v\n",
				pod, namespace, statusError.ErrStatus.Message)
		} else if err != nil {
			panic(err.Error())
		} else {
			fmt.Printf("Found pod %s in namespace %s\n", pod, namespace)
		}
		time.Sleep(10 * time.Second)
	}
}
