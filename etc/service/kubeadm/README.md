[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Kubeadm Service

```bash
chmod 744 /usr/local/bin/kubeadm-master
systemctl daemon-reload
systemctl enable kubeadm-master
systemctl start kubeadm-master
systemctl status kubeadm-master
journalctl -fu kubeadm-master
journalctl -lxeu kubeadm-master
cat /root/kubeadm.conf
cat /root/kubeadm.out
```

```bash
chmod 744 /usr/local/bin/kubeadm-join
systemctl daemon-reload
systemctl enable kubeadm-join
systemctl start kubeadm-join
systemctl status kubeadm-join
journalctl -fu kubeadm-join
journalctl -lxeu kubeadm-join
cat /root/kubeadm.conf
cat /root/kubeadm.out
```
