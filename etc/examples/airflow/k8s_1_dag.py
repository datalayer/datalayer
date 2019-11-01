# -*- coding: utf-8 -*-
"""
Helper functions for using KubernetesPodOperator
"""
from airflow.utils.log.logging_mixin import LoggingMixin
from airflow.contrib.kubernetes.volume_mount import VolumeMount
from airflow.contrib.kubernetes.volume import Volume

log = LoggingMixin().log

INPUT_VOLUME_NAME = 'input'
CONFIG_VOLUME_NAME = 'config'

def spark_volumes(input_pvc, spark_cm):
    """
    Creates the required volumes for the Spark pod
    """
    input = Volume(
        name=INPUT_VOLUME_NAME,
        configs={
            'persistentVolumeClaim': {'claimName': input_pvc}
        })

    config = Volume(
        name=CONFIG_VOLUME_NAME,
        configs={
            'configMap': {'name': spark_cm}
        })

    return [input, config]


def spark_volume_mounts():
    """
    Creates the required volume mounts for the Spark pod
    """
    input = VolumeMount(
        name=INPUT_VOLUME_NAME,
        mount_path='/opt/spark/input',
        sub_path=None,
        read_only=True
    )

    spark_defaults_conf = VolumeMount(
        name=CONFIG_VOLUME_NAME,
        mount_path='/opt/spark/conf/spark-defaults.conf',
        sub_path='spark-defaults.conf',
        read_only=True
    )

    hive_site_xml = VolumeMount(
        name=CONFIG_VOLUME_NAME,
        mount_path='/opt/spark/conf/hive-site.xml',
        sub_path='hive-site.xml',
        read_only=True
    )

    return [input, spark_defaults_conf, hive_site_xml]
