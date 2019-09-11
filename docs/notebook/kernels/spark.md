---
title: Spark Kernel
---

# Spark Kernel

## PySpark

```bash
pip install --upgrade jupyterlab jupyter_enterprise_gateway --user
jupyter lab --port 8889
export PYSPARK_DRIVER_PYTHON=jupyter
export PYSPARK_DRIVER_PYTHON_OPTS='lab --port 8889'
pyspark
jupyter enterprisegateway
ssh -N -f -L 8889:localhost:8889 ${USER}${HOST}
open http://localhost:8889?token=...
```

## Findspark

```bash
pip install findspark
jupyter lab
```

## Toree

```bash
# Build toree.
curl https://codeload.github.com/apache/incubator-toree/tar.gz/v0.2.0-incubating | tar -xz && \
  cd incubator-toree-0.2.0-incubating
# cd $DLAHOME/repos/jupyter-toree
make clean build release APACHE_SPARK_VERSION=2.4.0
# pip install toree --no-index --find-links=./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip install --upgrade ./dist/toree-pip/toree-*.tar.gz
# Install toree from PyPI.
# pip install --pre toree
pip install toree
pip freeze | grep toree
export SPARK_HOME=/opt/spark
#  --toree_opts='--nosparkcontext'
jupyter toree install \
  --spark_home=$SPARK_HOME \
  --interpreters='Scala,PySpark,SparkR,SQL' \
  --spark_opts='--master=local[*]'
```

```bash
# Python and R interpreters are removed https://github.com/apache/incubator-toree/pull/166
jupyter kernelspec list
```

```bash
SPARK_OPTS='--master=local[*]' jupyter lab
```

[Toree Magics](https://github.com/apache/incubator-toree/blob/master/etc/examples/notebooks/magic-tutorial.ipynb).

Options.

--ToreeApp.log_datefmt=<Unicode>
    Default: '%Y-%m-%d %H:%M:%S'
    The date format used by logging formatters for %(asctime)s
--ToreeApp.log_format=<Unicode>
    Default: '[%(name)s]%(highlevel)s %(message)s'
    The Logging format template
--ToreeApp.log_level=<Enum>
    Default: 30
    Choices: (0, 10, 20, 30, 40, 50, 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL')
    Set the log level by value or name.

```bash
jupyter kernelspec remove apache_toree_scala
```

`/usr/local/share/jupyter/kernels/apache_toree_pyspark/bin/run.sh` which is invoked by the pyspark kernel.

```bash
    --master k8s://https://...:6443 \
    --conf spark.executor.instances=3 \
    --conf spark.kubernetes.container.image=...:5000/.../spark-py:v2.3.0 \
    --conf spark.kubernetes.authenticate.driver.serviceAccountName=spark \
```

So the exec call looks like this:

```bash
eval exec \
  "${SPARK_HOME}/bin/spark-submit" \
  --name "'Apache Toree'" \
  "${SPARK_OPTS}" \
  --master k8s://https://...:6443 \
  --conf spark.executor.instances=3 \
  --conf spark.kubernetes.container.image=...:5000/.../spark-py:v2.3.0 \
  --conf spark.kubernetes.authenticate.driver.serviceAccountName=spark \
  --class org.apache.toree.Main \
  "${TOREE_ASSEMBLY}" \
  "${TOREE_OPTS}" \
  "$@"
```

## PixiDust

PixieDust [GitHub](https://github.com/pixiedust/pixiedust) repository.

PixiDust [Docs](https://pixiedust.github.io/pixiedust).

```bash
cd $DLAHOME/repos/jupyterlab-pixiedust && \
  pip install -e .
jupyter pixiedust install
jupyter pixiedust list
```

## Spark Magic

Spark Magic with Livy Kernel [GitHub](https://github.com/jupyter-incubator/sparkmagic) repository.

## Jupyter Spark

+ [jupyter-spark](https://github.com/mozilla/jupyter-spark).

## Spark Monitor

+ [sparkmonitor](https://github.com/krishnan-r/sparkmonitor).

## SQL Magic

+ [sql_magic](https://github.com/pivotal-legacy/sql_magic).
