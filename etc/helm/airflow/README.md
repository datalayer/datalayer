[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Airflow Helm Chart

```bash
# https://marclamberti.com/blog/airflow-kubernetes-executor
# https://medium.com/@ramandumcs/how-to-run-apache-airflow-on-kubernetes-1cb809a8c7ea
# https://www.datacouncil.ai/hubfs/DataEngConf/Data%20Council/Slides%20SF%2019/Running%20Airflow%20reliably%20with%20Kubernetes.pdf
# https://roland.de-boo.nl/airflow-on-kubernetes
# https://medium.com/terragoneng/setting-up-airflow-on-kubernetes-with-aws-efs-c659f3a16292
```

```bash
# https://github.com/brechtdevlieger/airflow-kube-helm
# https://towardsdatascience.com/kubernetesexecutor-for-airflow-e2155e0f909c
cd && git clone https://github.com/brechtdevlieger/airflow-kube-helm.git && cd airflow-kube-helm
./examples/minikube/docker/build-docker.sh
# python -c "from cryptography.fernet import Fernet; FERNET_KEY = Fernet.generate_key().decode(); print(FERNET_KEY)"
cat <<EOF > values.yaml
airflow:
  fernet_key: "j0PNE8131Vx-ix7BsNDwskFUlnLa00mWU17BRujVcdY="
  image:
    repository: airflow
    tag: latest
    pull_policy: IfNotPresent
  dags:
    persistence:
      enabled: false
    git:
      url: https://github.com/apache/airflow
      branch: master
      subpath: airflow/example_dags
      wait: 60
EOF
helm dependency update ./airflow
helm upgrade --install airflow ./airflow \
    --namespace airflow \
    --values ./values.yaml
kubectl port-forward --namespace airflow $(kubectl get pod --namespace airflow --selector="app=airflow-web,release=airflow" --output jsonpath='{.items[0].metadata.name}') 8080:8080
open http://localhost:8080.
```

```bash
# https://gist.github.com/kppullin/54d07f557c7c64c321786d6ed40b46e1
```

```bash
# https://github.com/tekn0ir/airflow-docker
cd && git clone https://github.com/tekn0ir/airflow-docker.git && cd airflow-docker
docker build -t="tekn0ir/airtflow_rs" github.com/tekn0ir/airflow-docker
# https://github.com/tekn0ir/airflow-chart
cd
git clone https://github.com/tekn0ir/airflow-chart.git
cd airflow-chart
helm dependency update
helm upgrade --install airflow --namespace=airflow .
```
