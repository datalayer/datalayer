package azure

type AzureKuberCluster struct {
	KuberClusterId    uint
	ResourceGroup     string
	AgentCount        int
	AgentName         string
	KubernetesVersion string
}

type CreateAzureCluster struct {
	Node *CreateAzureNode `json:"node"`
}

type CreateAzureNode struct {
	KubernetesVersion string `json:"kubernetesVersion"`
	ResourceGroup     string `json:"resourceGroup"`
	AgentCount        int    `json:"agentCount"`
	AgentName         string `json:"agentName"`
}

type UpdateAzureCluster struct {
	*UpdateAzureNode `json:"node"`
}

type UpdateAzureNode struct {
	AgentCount int `json:"agentCount"`
}
