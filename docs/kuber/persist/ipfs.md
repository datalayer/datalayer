---
title: IPFS
---

# IPFS

IPFS [Docs](https://docs.ipfs.io).

## Community

+ https://github.com/ipfs/community

+ [🙌 IPFS Weekly Call + Contributor Office Hours 📡 💫 2019-05-13](https://github.com/ipfs/community/issues/408).
+ [🙌 IPFS Weekly Call + Contributor Office Hours 📡 💫 2019-05-06](https://github.com/ipfs/community/issues/408).

+ https://github.com/ipfs/team-mgmt
+ https://github.com/ipfs/team-mgmt/blob/master/IPFS_WEEKLY_CALL.md

## Install

```bash
go get -u github.com/ipfs/ipfs-update
ipfs-update versions
ipfs-update install latest
```

```bash
# Install IPFS Service.
go get -u -d github.com/ipfs/go-ipfs
cd $GOPATH/src/github.com/ipfs/go-ipfs
make install
```

## Init

```bash
ipfs init
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
"""
Check out some of the other files in this directory:
  ./about
  ./help
  ./quick-start     <-- usage examples
  ./readme          <-- this file
  ./security-notes
"""
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
```

## Daemon

```bash
ipfs daemon
ipfs swarm peers
"""
/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
/ip4/134.121.64.93/tcp/1035/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5
/ip4/178.62.8.190/tcp/4002/ipfs/QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB
These are a combination of <transport address>/ipfs/<hash-of-public-key>.
"""
ipfs cat /ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg > cat.jpg
open cat.jpg
hash=`echo "I <3 IPFS -$(whoami)" | ipfs add -q`
# QmRm38yEEqRngTWBGJjVSSHgoyGEqTAcUyNku8FiME8AhN
echo $hash
# Note: depending on the state of the network, the `curl` may take a while. The public gateways may be overloaded or having a hard time reaching you.
curl "https://ipfs.io/ipfs/$hash"
curl "http://127.0.0.1:8080/ipfs/$hash"
open "http://localhost:5001/webui"
```

## Gateway

+ https://gateway.ipfs.io/ipfs/QmaEBknbGT4bTQiQoe2VNgBJbRfygQGktnaW5TbuKixjYL
+ https://ipfs.infura.io/ipfs/QmaEBknbGT4bTQiQoe2VNgBJbRfygQGktnaW5TbuKixjYL

+ https://www.cloudflare.com/distributed-web-gateway

## IPLD

+ https://ipld.io

## Git

+ https://github.com/ipfs-shipyard/git-remote-ipld
+ https://github.com/axic/mango
+ https://github.com/AuHau/ipfs-publish
+ https://github.com/radicle-dev/radicle
+ https://github.com/oscoin/ipfs/tree/master/git-remote-ipfs#install
+ https://github.com/pandonetwork/pando

## Spark

[Application: Data Processing Workflows on IPFS](https://github.com/ipfs/ipfs/issues/248).
