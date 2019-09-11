package helm

import (
	"bytes"
	"fmt"
	"strings"
	"text/template"

	k8s "github.com/datalayer/datalayer/apps/kuber/k8s"
	"github.com/datalayer/datalayer/apps/kuber/util"

	"github.com/datalayer/datalayer/apps/kuber/log"
	"k8s.io/client-go/kubernetes"

	"github.com/Masterminds/sprig"
	"github.com/ghodss/yaml"
	"github.com/kris-nova/kubicorn/apis/cluster"
	"k8s.io/client-go/rest"
	"k8s.io/helm/pkg/chartutil"
	h "k8s.io/helm/pkg/helm"
	"k8s.io/helm/pkg/helm/portforwarder"
	"k8s.io/helm/pkg/kube"
	"k8s.io/helm/pkg/proto/hapi/chart"
	rls "k8s.io/helm/pkg/proto/hapi/services"

	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

var tillerTunnel *kube.Tunnel
var namespace = "default"

func Deploy(cluster *cluster.Cluster, chartName string, releaseName string, valueOverrides []byte) (*rls.InstallReleaseResponse, error) {
	defer tearDown()
	chartPath := getChartPath(chartName)
	chartRequested, err := chartutil.Load(chartPath)
	if err != nil {
		return nil, fmt.Errorf("Error loading chart: %v", err)
	}
	if req, err := chartutil.LoadRequirements(chartRequested); err == nil {
		if err := checkChartDependencies(chartRequested, req); err != nil {
			return nil, err
		}
	} else if err != chartutil.ErrRequirementsNotFound {
		return nil, fmt.Errorf("cannot load requirements: %v", err)
	}
	kubeConfig, err := k8s.GetConfig()
	if err != nil {
		return nil, err
	}
	if len(strings.TrimSpace(releaseName)) == 0 {
		releaseName, _ = generateReleaseName("")
	}
	hClient, err := getHelmClient(kubeConfig)
	if err != nil {
		return nil, err
	}
	/*
			// Options used in InstallRelease
			ops := []InstallOption{
				ValueOverrides(overrides),
				InstallDryRun(dryRun),
				ReleaseName(releaseName),
				InstallReuseName(reuseName),
				InstallDisableHooks(disableHooks),
		}
	*/
	installRes, err := hClient.InstallReleaseFromChart(
		chartRequested,
		namespace,
		h.ValueOverrides(valueOverrides),
		h.ReleaseName(releaseName),
		h.InstallDryRun(false),
		h.InstallReuseName(true),
		h.InstallDisableHooks(false),
		h.InstallTimeout(30),
		h.InstallWait(false))
	if err != nil {
		return nil, fmt.Errorf("Error deploying chart: %v", err)
	}
	return installRes, err
}

func GetDeployment(cluster *cluster.Cluster, releaseName string) (*rls.ListReleasesResponse, error) {
	return GetDeployments(cluster, &releaseName)
}

func GetDeployments(cluster *cluster.Cluster, filter *string) (*rls.ListReleasesResponse, error) {
	defer tearDown()
	kubeConfig, err := k8s.GetConfig()
	if err != nil {
		return nil, err
	}
	hClient, err := getHelmClient(kubeConfig)
	var sortBy = int32(2)
	var sortOrd = int32(1)
	ops := []h.ReleaseListOption{
		h.ReleaseListSort(sortBy),
		h.ReleaseListOrder(sortOrd),
		//h.ReleaseListLimit(limit),
		//h.ReleaseListFilter(filter),
		//h.ReleaseListStatuses(codes),
		//h.ReleaseListNamespace(""),
	}
	if filter != nil {
		ops = append(ops, h.ReleaseListFilter(*filter))
	}
	if err != nil {
		return nil, err
	}
	resp, err := hClient.ListReleases(ops...)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func UpgradeDeployment(cluster *cluster.Cluster, deploymentName, chartName string, values map[string]interface{}) (string, error) {
	base := map[string]interface{}{}
	base = util.MergeValues(base, values)
	updateValues, err := yaml.Marshal(base)
	if err != nil {
		return "", err
	}
	defer tearDown()
	chartPath := getChartPath(chartName)
	chartRequested, err := chartutil.Load(chartPath)
	if err != nil {
		return "", fmt.Errorf("Error loading chart: %v", err)
	}
	if req, err := chartutil.LoadRequirements(chartRequested); err == nil {
		if err := checkChartDependencies(chartRequested, req); err != nil {
			return "", err
		}
	} else if err != chartutil.ErrRequirementsNotFound {
		return "", fmt.Errorf("cannot load requirements: %v", err)
	}
	var kubeConfig *rest.Config
	if cluster != nil {
		kubeConfig, err = k8s.GetConfig()
		if err != nil {
			return "", err
		}
	}
	hClient, err := getHelmClient(kubeConfig)
	if err != nil {
		return "", err
	}
	upgradeRes, err := hClient.UpdateReleaseFromChart(
		deploymentName,
		chartRequested,
		h.UpdateValueOverrides(updateValues),
		h.UpgradeDryRun(false),
	//h.UpgradeRecreate(u.recreate),
	//h.UpgradeForce(u.force),
	//h.UpgradeDisableHooks(u.disableHooks),
	//h.UpgradeTimeout(u.timeout),
	//h.ResetValues(u.resetValues),
	//h.ReuseValues(u.reuseValues),
	//h.UpgradeWait(u.wait)
	)
	if err != nil {
		return "", fmt.Errorf("upgrade failed: %v", err)
	}
	return upgradeRes.Release.Name, nil
}

func CheckDeploymentState(cluster *cluster.Cluster, releaseName string) (string, error) {
	kubeConfig, err := k8s.GetConfig()
	if err != nil {
		return "", err
	}
	client := kubernetes.NewForConfigOrDie(kubeConfig)
	filter := fmt.Sprintf("release=%s", releaseName)
	state := v1.PodRunning
	podList, err := client.CoreV1().Pods("").List(metav1.ListOptions{LabelSelector: filter})
	if err != nil && podList != nil {
		return "", fmt.Errorf("PoD list failed: %v", err)
	}
	for _, pod := range podList.Items {
		log.Debug("PodStatus: %s", pod.Status.Phase)
		if pod.Status.Phase == v1.PodRunning {
			continue
		} else {
			state = pod.Status.Phase
			break
		}
	}
	return string(state), nil
}

func PurgeDeployment(cluster *cluster.Cluster, releaseName string) error {
	defer tearDown()
	kubeConfig, err := k8s.GetConfig()
	if err != nil {
		return err
	}
	hClient, err := getHelmClient(kubeConfig)
	if err != nil {
		return err
	}
	_, err = hClient.DeleteRelease(releaseName, h.DeletePurge(true))
	if err != nil {
		return err
	}
	return nil
}

func generateReleaseName(nameTemplate string) (string, error) {
	t, err := template.New("name-template").Funcs(sprig.TxtFuncMap()).Parse(nameTemplate)
	if err != nil {
		return "", err
	}
	var b bytes.Buffer
	err = t.Execute(&b, nil)
	if err != nil {
		return "", err
	}
	return b.String(), nil
}

func checkChartDependencies(ch *chart.Chart, reqs *chartutil.Requirements) error {
	missing := []string{}
	deps := ch.GetDependencies()
	for _, r := range reqs.Dependencies {
		found := false
		for _, d := range deps {
			if d.Metadata.Name == r.Name {
				found = true
				break
			}
		}
		if !found {
			missing = append(missing, r.Name)
		}
	}
	if len(missing) > 0 {
		return fmt.Errorf("found in requirements.yaml, but missing in charts/ directory: %s", strings.Join(missing, ", "))
	}
	return nil
}

func getHelmClient(config *rest.Config) (*h.Client, error) {
	var err error
	log.Debug("Create kubernetes Client.")
	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Error("Could not create kubernetes client from config.")
		return nil, fmt.Errorf("create kubernetes client failed: %v", err)
	}
	log.Debug("Create kubernetes Tunnel.")
	tillerTunnel, err := portforwarder.New("kube-system", client, config)
	if err != nil {
		return nil, fmt.Errorf("create tunnel failed: %v", err)
	}
	log.Debug("Created kubernetes tunnel on address: localhost:%d .", tillerTunnel.Local)
	tillerTunnelAddress := fmt.Sprintf("localhost:%d", tillerTunnel.Local)
	hclient := h.NewClient(h.Host(tillerTunnelAddress))
	return hclient, nil
}

func getChartPath(helmName string) string {
	return util.GetDatalayerHome() + "/helm-chart/charts" + "/" + helmName
}

func tearDown() {
	log.Debug("There is no Tunnel to close.")
	if tillerTunnel != nil {
		log.Debug("Closing Tunnel.")
		tillerTunnel.Close()
	}
}
