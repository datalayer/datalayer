---
title: Airflow
---

# Airflow

> [Apache Airflow](https://github.com/apache/airflow) - Airflow is a platform to programmatically author, schedule and monitor workflows.

Read the Airflow [docs](https://airflow.apache.org).

## Setup

```bash
# `airflow` needs a HOME, ~/airflow is the default.
export AIRFLOW_HOME=~/airflow
pip install git+https://github.com/apache/incubator-airflow@1.10.0rc2#egg=apache-airflow
pip install "apache-airflow[s3, postgres, celery, crypto, redis, flower]"
# Initialize the database.
airflow initdb
```

## Startup

```bash
# Initialize the database.
airflow initdb
# Start the web server, default port is 8080
airflow webserver -p 8080
open http://0.0.0.0:8080
```

```bash
# Start the scheduler.
airflow scheduler
```

```bash
airflow worker
```

```bash
# pip install flower
# flower --port=5555 --broker=redis://localhost:6379/0
# flower -A proj --port=5555 --broker=redis://localhost:6379/0
airflow flower
open http://0.0.0.0:5555
```

## DAG

```python
"""
Code that goes along with the Airflow tutorial located at:
https://github.com/airbnb/airflow/blob/master/airflow/example_dags/tutorial.py
"""
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2015, 6, 1),
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}
dag = DAG('tutorial', default_args=default_args)
# t1, t2 and t3 are examples of tasks created by instantiating operators
t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag=dag)
t2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,
    dag=dag)
templated_command = """
    {% for i in range(5) %}
        echo "{{ ds }}"
        echo "{{ macros.ds_add(ds, 7)}}"
        echo "{{ params.my_param }}"
    {% endfor %}
"""
t3 = BashOperator(
    task_id='templated',
    bash_command=templated_command,
    params={'my_param': 'Parameter I passed in'},
    dag=dag)
t2.set_upstream(t1)
t3.set_upstream(t1)
```

## Commands

```bash
python dag-1.py
airflow list_dags -sd dag-1.py
airflow list_tasks -sd dag-1.py step1
airflow list_tasks -sd dag-1.py --tree step1
airflow test -sd dag-1.py step1 <task_name> <date>
airflow test -sd dag-1.py step1 start_batch 2018-08-01
airflow test -sd dag-1.py step1 time_delta_sensor 2018-08-01
airflow run step1 start_batch 2018-08-01T00:00:00 -i --raw --force --local --raw -sd dag-1.py
airflow delete_dag my_dag_id
curl -X "DELETE" http://127.0.0.1:8080/api/experimental/dags/my_dag_id
```

## Kubernetes Executor

[Airflow on Kubernetes: Dynamic Workflows Simplified](https://docs.google.com/document/d/1rgvz0nep65Y3uDXNCPoL6_xHjA7FeMtLOGj_1oEhJ10/edit#).
[Airflow on Kubernetes: Dynamic Workflows Simplified](https://www.youtube.com/watch?v=VrsVbuo4ENE).
[Airflow tutorial 2: Set up airflow environment with docker](https://www.youtube.com/watch?v=vvr_WNzEXBE).

## Celery Executor

```bash
sudo apt-get install postgresql postgresql-contrib
sudo adduser airflow
sudo usermod -aG sudo airflow
su - airflow
sudo -u postgres psql
CREATE USER airflow PASSWORD ‘a1rfl0w’;
CREATE DATABASE airflow;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO airflow;
\du
sudo vi /etc/postgresql/10/main/pg_hba.conf
# IPv4 local connections:
host all all 0.0.0.0/0 trust
# Restart the service
sudo service postgresql restart
sudo vi /etc/postgresql/10/main/postgresql.conf
# — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
# CONNECTIONS AND AUTHENTICATION
# — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
# — Connection Settings -
#listen_addresses = ‘localhost’ # what IP address(es) to listen on;
listen_addresses = ‘*’ 
# for Airflow connection
# Restart the service
sudo service postgresql restart
```

```bash
apt -y install redis-server
sed -i "s|bind |#bind |" /etc/redis/redis.conf
sed -i "s|protected-mode yes|protected-mode no|" /etc/redis/redis.conf
sed -i "s|supervised no|supervised systemd|" /etc/redis/redis.conf
service redis restart
```

```bash
# Set up airflow.cfg
broker_url = redis://localhost:6379/0
celery_result_backend = redis://localhost:6379/0
sql_alchemy_conn = postgresql+psycopg2://airflow:a1rfl0w@localhost:5432/airflow
```

## Kubeflow Integration

+ https://github.com/ryan-williams/airflow/tree/kfp
+ https://github.com/ryan-williams/airflow/blob/kfp/airflow/contrib/example_dags/kubeflow_pipelines_README.md
+ https://zoom.us/recording/play/haOkfLEbkE6HrHHovnYlC5OZ183_nfeyAaxyRA8nFifv8z0WFUeR3b03Lg4PeoXH
+ https://www.kubeflow.org/docs/pipelines/overview/pipelines-overview

## Batch Scheduling for Spark operator with Volcano

+ https://zoom.us/recording/share/XCAi25qOHRk3KurV5cjA0_IOkzTr3nS0HFVArei_Q32wIumekTziMw?startTime=1571245495000
