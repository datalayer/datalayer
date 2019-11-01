# Storage Class

```bash
cat << EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
  annotations:
    storageclass.kubernetes.io/is-default-class: 'true'
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
#  zones: eu-west-1a, eu-west-1b
#  iopsPerGB: '10' 
#  fsType: ext4
reclaimPolicy: Retain
mountOptions:
  - debug
volumeBindingMode: Immediate
EOF
```

## Test

Create a EBS to test your Storage Class.

```bash
kubectl get storageclass
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-1
  labels:
    app: pvc
spec:
  storageClassName: standard
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF
kubectl describe pvc pvc-1
```

```bash
kubectl delete pvc pvc-1
```
