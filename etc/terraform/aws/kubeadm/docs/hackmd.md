# HackMD

```bash
cat <<EOF > hackmd.yaml
ingress:
  enabled: 'true'
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
  hosts:
  - hackmd.dla.datalayer.io
EOF
helm upgrade \
  --install hackmd \
  stable/hackmd \
  --values hackmd.yaml \
  --timeout 99999
```
