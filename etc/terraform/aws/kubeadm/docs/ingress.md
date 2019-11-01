# Ingress

```bash
cat <<EOF > ingress-nginx.yaml
controller:
  config:
    ssl-redirect: 'true'
    use-forwarded-headers: 'true'
  service:
    targetPorts:
      http: http
      https: http
    labels:
      dns: 'route53'
    annotations:
      nginx.ingress.kubernetes.io/ssl-redirect: 'true'
      nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
      service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:...:certificate/...
      service.beta.kubernetes.io/aws-load-balancer-backend-protocol: 'http'
      service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 'https'
      service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'
      domainName: 'test.dla.datalayer.io'
EOF
helm upgrade \
  --install ingress-nginx \
  stable/nginx-ingress \
  --values ingress-nginx.yaml \
  --timeout 99999
```

