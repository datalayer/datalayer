[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Minihub Examples

```bash
jupyterhub --generate-config
# See the  default `generated` configuration.
cat ./jupyterhub_config_generated.py
```

Use the `<auth>`-`<spawner>`-`(<option>)` pattern to try various configuration examples.

```bash
echo open http://localhost:8000
```

```bash
# PAM Authentication.
cd ./pam-local && \
  jupyterhub
cd ./pam-docker && \
  jupyterhub
```

```bash
# PAM Local Spawn Form.
# open http://localhost:8000
cd ./spawn-local-form && \
  jupyterhub
```

```bash
# Null Authentication.
cd ./null-local && \
  jupyterhub
```

```bash
# GitHub Authentication.
cd ./github-local && \
  jupyterhub
cd ./github-docker && \
  jupyterhub
```

```bash
# Service Announcement.
# open http://localhost:8000/services/announcement
cd ./service-announcement && \
  jupyterhub
```

```bash
# Service Whoami.
# open http://localhost:8000/services/whoami
# open http://localhost:8000/services/whoami-oauth
cd ./service-whoami && \
  jupyterhub
```

```bash
# Service Shared Notebook.
# open http://localhost:8000/services/shared-notebook
cd ./service-notebook/managed && \
  jupyterhub
```

```bash
# Service Login.
# open http://localhost:8000/services/login
cd ./service-null-auth && \
  jupyterhub
```
