---
title: Kerberos
---

# Kerberos

## Install

```bash
# Ubuntu
apt install krb5-kdc krb5-admin-server krb5-kdc-ldap
```

```bash
# Centos
yum install krb5-server krb5-libs krb5-auth-dialog krb5-workstation
```

## Configure

Ensure name resolution. For example, in /etc/hosts (assuming you have docker installed)

```
127.0.0.1   localhost
127.0.0.1   eric.datalayer.io eric
```

Test with `nslookup eric.datalayer.io` and `nslookup 172.17.42.1`

Configure `/etc/krb5.conf`

```bash
[libdefaults]
  default_realm = DATALAYER.IO
  rdns = false
  udp_preference_limit = 1
  dns_lookup_realm = false
  dns_lookup_kdc = false
  ticket_lifetime = 24h
  renew_lifetime = 7d
  forwardable = true
  default_tkt_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  default_tgs_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  permitted_enctypes = aes128-cts-hmac-sha1-96 des-cbc-crc des-cbc-md5 des3-cbc-sha1 rc4-hmac
  allow_weak_crypto = true
[realms]
  DATALAYER.IO = {
    kdc = localhost
    admin_server = localhost
  }
  DATALAYER.IO = {
    kdc = 192.168.1.10
    admin_server = 192.168.1.10
  }
  DATALAYER.IO = {
    kdc = docker
    admin_server = docker
  }
[domain_realm]
  localhost = DATALAYER.IO
  .localhost = DATALAYER.IO
  datalayer.io = DATALAYER.IO
  .datalayer.io = DATALAYER.IO
  DATALAYER.IO = DATALAYER.IO
  .DATALAYER.IO = DATALAYER.IO
[login]
  krb4_convert = false
  krb4_get_tickets = false
[logging]
  kdc = FILE:/var/log/kerberos/krb5kdc.log
  admin_server = FILE:/var/log/kerberos/kadmin.log
  default = FILE:/var/log/kerberos/krb5lib.log
```

Prepare log files

```bash
sudo mkdir /var/log/kerberos
sudo touch /var/log/kerberos/{krb5kdc,kadmin,krb5lib}.log
sudo chmod -R 750  /var/log/kerberos
```

Configure /etc/krb5kdc/kdc.conf

```bash
[libdefaults]
  rdns = false
[kdcdefaults]
  kdc_ports = 750,88
  supported_enctypes = aes128-cts-hmac-sha1-96:normal des3-cbc-sha1:normal des-cbc-md5:normal des-cbc-crc:normal rc4-hmac:normal
[realms]
  @DATALAYER.IO = {
    database_name = /var/lib/krb5kdc/principal
    admin_keytab = FILE:/etc/krb5kdc/kadm5.keytab
    acl_file = /etc/krb5kdc/kadm5.acl
    key_stash_file = /etc/krb5kdc/stash
    kdc_ports = 750,88
    max_life = 10h 0m 0s
    supported_enctypes = des3-hmac-sha1:normal des-cbc-crc:normal des:normal des:v4 des:norealm des:onlyrealm des:afs3  
    supported_enctypes = aes128-cts-hmac-sha1-96:normal des3-cbc-sha1:normal des-cbc-md5:normal des-cbc-crc:normal rc4-hmac:normal
#    max_renewable_life = 7d 0h 0m 0s
#    master_key_type = des3-hmac-sha1
#    default_principal_flags = +preauth
  }
```

Destroy and create a Kerberos database.

```
sudo kdb5_util destroy
sudo kdb5_util create -s -r DATALAYER.IO
```

## Start

```bash
# Ubuntu
sudo invoke-rc.d ssh restart
sudo invoke-rc.d krb5-kdc restart
sudo invoke-rc.d krb5-admin-server restart
```

```bash
# Centos
sudo service sshd restart
sudo service krb5kdc restart
sudo service kadmin restart
```

## Principal

Create an administrative principal so you can do remote administration 
(if you are logged into the machine running the administrative server, 
you can just use kadmin.local, and you really don't need the admin principal, 
but create it anyway for posterity's sake):

```
sudo kadmin.local -q "addprinc admin/admin"
```

Start an interactive kadmin session (using the admin principal), 
and add principals for your username, the host the kdc and kadmin servers 
are running on, and your workstation: 

```
sudo kadmin.local -p admin/admin
delete_principal datalayer
delete_principal datalayer/localhost
listprincs
K/M@DATALAYER.IO
admin/admin@DATALAYER.IO
kadmin/admin@DATALAYER.IO
kadmin/changepw@DATALAYER.IO
kadmin/ambari.datalayer.io.local@DATALAYER.IO
addprinc datalayer/ambari.datalayer.io.local@DATALAYER.IO
addprinc eric/ambari.datalayer.io.local@DATALAYER.IO
kadmin.local: q
```

## Get a TGT from the KDC

To start, you have no ticket.

```
klist
klist: No credentials cache found (ticket cache FILE:/tmp/krb5cc_500)
```

Time to ask for a ticket.kki

```
kinit datalayer/localhost@DATALAYER.IO
Password for datalayer/localhost@DATALAYER.IO:
*****
```

Check you can get a Granting ticket.

```
klist
Ticket cache: FILE:/tmp/krb5cc_1000
Default principal: datalayer/localhost@DATALAYER.IO
Valid starting       Expires              Service principal
01/07/2015 09:36:21  01/08/2015 09:36:21  krbtgt/DATALAYER.IO@DATALAYER.IO
```

Finally, destroy your ticket.

```bash
kdestroy
```

# Export Keytab

```bash
sudo mkdir /etc/security/keytabs
sudo cd /etc/security/keytabs
sudo /usr/sbin/kadmin.local -q "delete_principal HTTP/ambari.datalayer.io.local@DATALAYER.IO"
sudo /usr/sbin/kadmin.local -q "addprinc -randkey HTTP/ambari.datalayer.io.local@DATALAYER.IO"
sudo rm datalayer.keytab
sudo /usr/sbin/kadmin.local -q "xst -k /etc/security/keytabs/datalayer.keytab HTTP/ambari.datalayer.io.local@DATALAYER.IO"
sudo chmod 400 /etc/security/keytabs/*.keytab
sudo klist -kt /etc/security/keytabs/datalayer.keytab
```

## Get Ticket from Keytab

```bash
klist -k /etc/security/keytabs/rm.service.keytab
kinit -kt /etc/security/keytabs/rm.service.keytab rm/ambari.datalayer.io.local@DATALAYER.IO
klist
kinit -kt /etc/security/keytabs/spnego-localhost.keytab HTTP/localhost@DATALAYER.IO
```

## Troubleshooting Kerberos

Debugging Hadoop/Kerberos problems can be “difficult”. One useful technique is to enable extra logging of Kerberos operations in Hadoop by setting the HADOOP_JAAS_DEBUG environment variable.

1export HADOOP_JAAS_DEBUG=true

The JDK classes can be configured to enable extra logging of their Kerberos and SPNEGO/REST authentication via the system properties sun.security.krb5.debug and sun.security.spnego.debug=true

-Dsun.security.krb5.debug=true -Dsun.security.spnego.debug=true

All these options can be enabled in the Application Master:

spark.yarn.appMasterEnv.HADOOP_JAAS_DEBUG true
spark.yarn.am.extraJavaOptions -Dsun.security.krb5.debug=true -Dsun.security.spnego.debug=true

Finally, if the log level for org.apache.spark.deploy.yarn.Client is set to DEBUG, the log will include a list of all tokens obtained, and their expiry details

For Java code, run with: `-Dsun.security.krb5.debug=true`

For Hadoop, run with: `export HADOOP_OPTS='-Dsun.security.krb5.debug=true'`

To debug Kerberos, use -Dsun.security.krb5.debug=true -Dsun.security.spnego.debug=true -Djavax.net.debug=all

# Manual commands to test the saved image

```bash
rm -fr /hadoop/hdfs/data
su - hdfs
hadoop --config /etc/hadoop/conf namenode -format HadoopCluster
exit
service sshd restart; service krb5kdc restart; service kadmin restart
ambari-server setup -s -j /usr/lib/jvm/jre-1.7.0-openjdk.x86_64
service ambari-agent restart; service ambari-server restart
```

```
Fail: Execution of '/usr/hdp/current/falcon-client/bin/falcon-start -port 15000' returned 1.
/usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/java and/or /usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/jar not found on the system.
Please make sure java and jar commands are available.
```

```
cd /usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/
ln -s /usr/bin/jar
/usr/hdp/current/falcon-client/bin/falcon-start -port 15000
```

```
kadmin.local -q "addprinc admin/admin"
```

```
kadmin.local -p admin/admin
listprincs
addprinc root
q
/usr/sbin/kadmin.local -q "xst -k datalayer.keytab datalayer/localhost@DATALAYER.IO"
klist -k -t datalayer.keytab
cp datalayer.keytab /etc/security/keytabs
chmod 400 /etc/security/keytabs/datalayer.keytab
klist -k -t /etc/security/keytabs/datalayer.keytab
klist -k -t /etc/security/keytabs/yarn.service.keytab
```

```
kdestroy
kinit root
klist
```

```
$HADOOP_HOME/bin/hadoop --config $HADOOP_CONF_DIR namenode -format DatalayerHadoopCluster
$HADOOP_HOME/sbin/hadoop-daemon.sh --config $HADOOP_CONF_DIR --hostnames localhost start namenode
$HADOOP_HOME/sbin/hadoop-daemon.sh --config $HADOOP_CONF_DIR --hostnames localhost start secondarynamenode
$HADOOP_HOME/sbin/hadoop-daemon.sh --config $HADOOP_CONF_DIR --hostnames localhost start datanode
$HADOOP_HOME/sbin/yarn-daemon.sh --config $HADOOP_CONF_DIR start resourcemanager
$HADOOP_HOME/sbin/yarn-daemon.sh --config $HADOOP_CONF_DIR start nodemanager
$HADOOP_HOME/sbin/yarn-daemon.sh start proxyserver --config $HADOOP_CONF_DIR
$HADOOP_HOME/sbin/mr-jobhistory-daemon.sh start historyserver --config $HADOOP_CONF_DIR
```

Follow http://www.slashroot.in/how-install-and-configure-kerberos-server to set up a kerberos server

http://www.linuxproblems.org/wiki/Set_up_kerberos_on_Centos_6 is similar but more correct

docker build -t centos-kerberos .

and then run the container, run the hand bits

docker rm krb ; docker run -P -t -i -name krb -h kerberos.home.org.au centos-kerberos bash
docker commit krb centos-kerberos

run the image by:

docker run -P -t -i -name krb -h kerberos.home.org.au centos-kerberos bash
