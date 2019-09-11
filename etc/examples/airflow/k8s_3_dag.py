from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow.operators.dummy_operator import DummyOperator

default_args = {
    'owner': 'airflow,
}

dag = DAG(
    'kubernetes_pods-custom',
    default_args=default_args,
    schedule_interval='20 3 * * *',
    start_date=datetime(2019, 7, 3)
)

hello = KubernetesPodOperator(namespace='airflow',
                          image="python",
                          cmds=["python","-c"],
                          arguments=["print('hello world')"],
                          task_id="task",
                          get_logs=True,
                          dag=dag,
                          in_cluster=True
                          )


hello >> task
