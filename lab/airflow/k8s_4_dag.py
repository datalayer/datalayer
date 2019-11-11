import datetime
import airflow
from airflow import DAG
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow.operators.dummy_operator import DummyOperator
from airflow import models
from airflow.contrib.operators import kubernetes_pod_operator

with models.DAG(
        dag_id='k8s_4_dag',
        schedule_interval=datetime.timedelta(days=1),
        start_date=airflow.utils.dates.days_ago(7)) as dag:
    kubernetes_min_pod = kubernetes_pod_operator.KubernetesPodOperator(
    namespace='default',
    image="python:3.6-stretch",
    cmds=["python","-c"],
    arguments=["print('hello world')"],
    labels={"foo": "bar"},
    name="airflow-test-pod",
    # is_delete_pod_operator=True,
    in_cluster=True,
    task_id="task-two",
    get_logs=True,
    dag=dag
    )
