# -*- coding: utf-8 -*-
import sys

from datetime import timedelta, date

from airflow.utils.dates import days_ago
from airflow.utils.log.logging_mixin import LoggingMixin
from airflow.models import DAG, Variable
from airflow.contrib.kubernetes.volume_mount import VolumeMount
from airflow.contrib.kubernetes.volume import Volume

from airflow.operators.python_operator import BranchPythonOperator
from airflow.operators.dummy_operator import DummyOperator

sys.path.append('/opt/airflow/dags')
from common.s3 import get_s3_client, file_exists
from common.k8s import spark_volume_mounts, spark_volumes

log = LoggingMixin().log

try:
    from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
except ImportError as err:
    log.warn("Could not import KubernetesPodOperator: ", str(err))
    log.warn("Install kubernetes dependencies with: pip install airflow['kubernetes']")

default_args = {
    'owner': 'airflow',
    'start_date': days_ago(2)
}

dag = DAG(
    dag_id='example-dag',
    default_args=default_args,
    schedule_interval=timedelta(days=1)
)

spark_vols = spark_volumes(
        input_pvc=Variable.get('scripts_pvc'),
        spark_cm=Variable.get('spark_config_cm')
    )

spark_vol_mounts = spark_volume_mounts()
spark_cmd = """
        source /opt/spark/.bashrc && \
        spark-submit \
        /opt/spark/input/pyspark/read_from_s3.py
        """

ingest_to_cleansed_task = KubernetesPodOperator(
    namespace='default',
    image=Variable.get('spark_driver_image'),
    cmds=["bash", "-cx"],
    arguments=[spark_cmd],
    labels={
        'app': 'spark',
        'role': 'edge'
    },
    name='example-dag',
    in_cluster=True,
    task_id='spark-task',
    volumes=spark_vols,
    volume_mounts=spark_vol_mounts,
    get_logs=True,
    dag=dag)
