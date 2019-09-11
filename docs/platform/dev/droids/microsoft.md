---
title: Microsoft
---

# Microsoft

Visit https://account.live.com/developers/applications/index
Click on Create application
Enter an Application name, then click on I accept button
Go to API Settings tab
Enter a Redirect URL
Click Save
Go to App Settings tab to get Client ID and Client Secret

Note: 
Microsoft does not consider localhost or 127.0.0.1 to be a valid URL. 
As a workaround for local development add 127.0.0.1 mylocalwebsite.net to /etc/hosts file and specify mylocalwebsite.net as your Redirect URL in the API Settings tab.

## Visit Live Connect App Management

Click on Create application
Enter an Application name, then click on I accept button
Go to API Settings tab
Enter a Redirect URL
Click Save
Go to App Settings tab to get Client ID and Client Secret

Note: Microsoft does not consider localhost or 127.0.0.1 to be a valid URL. As a workaround for local development add 127.0.0.1 mylocalwebsite.net to /etc/hosts file and specify mylocalwebsite.net as your Redirect URL on API Settings tab.

## Integration with Microsoft Security

We have developed mulituser+kerberos authentication on top and we want to integrate with Active Directory (on-premise + in-azure) to ease the user experience and also to reuse the authentication towards other Azure services (publishing to OneNote, calling a AzureML job...).

I have attached to this mail the 4 scenarii we discussed:

1. SPNEGO with Notebook in-Azure and AD on-premise.
2. OpenID Connect / OAuth2 with Notebook in-Azure and Azure Active Directory (extensible to on-site AD).
3. Same as Scenario 2 but with the connection with Azure Active Directory ensure on-site AD implemented with a VPN
4. SPNEGO with all (Notebook + AD) on-premise.

+ Windows Live
+ Active Directory
+ Azure Active Directory
+ Office 365

## Same authentication for Microsoft Live and Office 365

+ http://blogs.technet.com/b/ad/archive/2015/08/12/azure-ad-microsoft-account-preview-sign-in-personal-and-work-accounts-using-a-single-stack.aspx
+ https://apps.dev.microsoft.com
+ https://apps.dev.microsoft.com/#/appList

## Active Directory (AD)

Active Directory implements Kerberos for Authentication and LDAP for Authorization.

To access AD from Linux:

+ https://msdn.microsoft.com/en-us/library/bb742433.aspx
+ https://technet.microsoft.com/en-us/library/cc753771.aspx

+ https://azure.microsoft.com/en-us/documentation/articles/active-directory-developers-guide
+ https://technet.microsoft.com/en-us/magazine/2005.01.activedirectory.aspx
+ https://technet.microsoft.com/en-us/magazine/2008.12.linux.aspx
+ https://channel9.msdn.com/Events/Ignite/2015/BRK3867

The process for the most part consists of allowing delegation for the security context of the service doing the authentication and configuring the service principal names.

+ http://blogs.msdn.com/b/autz_auth_stuff/archive/2011/05/03/kerberos-delegation.aspx
+ https://technet.microsoft.com/en-us/library/cc731241(WS.10).aspx

AD supports LDAP and you can program against it.

+ https://technet.microsoft.com/en-us/library/cc750824.aspx
+ https://msdn.microsoft.com/en-us/library/windows/desktop/aa367008(v=VS.85).aspx

### Ports

Restricting RPC to a specific port

RPC traffic is used over a dynamic port range as described in the previous section, “Default dynamic port range.” To restrict RPC traffic to a specific port, see article 224196 in the Microsoft Knowledge Base (http://go.microsoft.com/fwlink/?LinkID=133489).
Communication to Domain Controllers

The following table lists the port requirements for establishing DC to DC communication in all versions of Windows Sever beginning with Windows Server 2003.

Additional ports are required for communication between a read-only domain controller (RODC) and a writeable DC.
 
Active Directory Explorer v1.44

+ https://technet.microsoft.com/en-us/library/bb963907.aspx

+ Protocol and Port > AD and AD DS Usage > Type of traffic

+ TCP and UDP 389 > Directory, Replication, User and Computer Authentication, Group Policy, Trusts > LDAP
+ TCP 636 > Directory, Replication, User and Computer Authentication, Group Policy, Trusts > LDAP SSL
+ TCP 3268 > Directory, Replication, User and Computer Authentication, Group Policy, Trusts > LDAP GC
+ TCP 3269 > Directory, Replication, User and Computer Authentication, Group Policy, Trusts > LDAP GC SSL
+ TCP and UDP 88 > User and Computer Authentication, Forest Level Trusts > Kerberos
+ TCP and UDP 53 > User and Computer Authentication, Name Resolution, Trusts > DNS
+ TCP and UDP 445 > Replication, User and Computer Authentication, Group Policy, Trusts > SMB,CIFS,SMB2, DFSN, LSARPC, NbtSS, NetLogonR, SamR, SrvSvc
+ TCP 25 > Replication > SMTP
+ TCP 135 > Replication > RPC, EPM
+ TCP Dynamic > Replication, User and Computer Authentication, Group Policy, Trusts > RPC, DCOM, EPM, DRSUAPI, NetLogonR, SamR, FRS
+ TCP 5722 > File Replication > RPC, DFSR (SYSVOL)
+ UDP 123 > Windows Time, Trusts > Windows Time
+ TCP and UDP 464 > Replication, User and Computer Authentication, Trusts > Kerberos change/set password
+ UDP Dynamic > Group Policy > DCOM, RPC, EPM
+ UDP 138 > DFS, Group Policy > DFSN, NetLogon, NetBIOS Datagram Service
+ TCP 9389 > AD DS Web Services > SOAP
+ UDP 67 and UDP 2535 > DHCP > DHCP is not a core AD DS service but it is often present in many AD DS deployments. > DHCP, MADCAP
+ UDP 137 > User and Computer Authentication, > NetLogon, NetBIOS Name Resolution
+ TCP 139 > User and Computer Authentication, Replication > DFSN, NetBIOS Session Service, NetLogon

Use "Bridged Adapter" as network configuration in your Virtualbox images.

If you really want to use NAT option

```
sudo usermod -a -G vboxusers $USER
groups $USER
id
```

```
VBoxManage modifyvm "Windows Server 2012" --natpf1 delete "LDAP"
VBoxManage modifyvm "Windows Server 2012" --natpf1 "LDAP,tcp,,3389,,389"
```

## Create a Keytab

### Step 1

Turn User Account Control off

+ http://windows.microsoft.com/en-us/windows/turn-user-account-control-on-off#1TC=windows-7

### Step 2

Create a user account within the Active Directory Users and Computers console by clicking 
Start → Administrative Tools → Active Directory Users and Computers → $Domain_Name (example.com in this scenario) → Users, 
then right-click in the right panel and select New → User.

Fill information for the user account, then click Next to move to the Create Password form.

Enter a password for the user account. For example, the username as "dla" with password as "aA@123456" will be used later.
Since this account is acting as a service account, select User cannot change password and Password never expires, then click Next. 
You need to remember this password to use later.

Verify the user settings, and select Finish.

Configure the new user account to comply with the Kerberos protocol as follows:

+ Right-click the user in the Users tree and select Properties. The User Properties form will open.
+ Navigate to the Account tab. Under the Account options section, ensure the followings are selected:
 + User cannot change password
 + Password never expires
 + Do not require Kerberos preauthentication.
 + Select "Account is trusted for delegation"

### Step 3. Configuring the Service Principal Name (SPN) for eXo Platform server

The setspn command is used to create a service principal for the user previously created. A service principal complies with the rule: serviceclass/host.

Because the web application is communicating via the HTTP protocol, HTTP is the service class.

The host is fully qualified domain name (FQDN) of the eXo Platform server.

The FQDN of the eXo Platform server in this case is server.example.com.

To add a Service Principal, use the commands that comply with the formats:

```
setspn -a HTTP/$hostname dlauser (that is, setspn -a HTTP/localhost dlauser)
setspn -a HTTP/$fully-qualified-host-name $username (that is, setspn -a HTTP/localhost.net dlauser)
```

Tip: Run the following command to see the SPN that you created.

```
setspn -l dlauser
```

### Step 4. Creating the Kerberos Keytab file used by SPNEGO

In this step, the ktpass is used to generate the keytab file by mapping the service principal to the user account created previously.

This file will then be stored in the eXo Platform server (on Machine 2).

Create the keytab file for the eXo Platform server running in an Windows 2008 domain environment that complies with the format:

```
ktpass.exe /princ HTTP/$fully-qualified-domain-name@realm-name /pass "$password" /mapuser "$username" /out $hostname.keytab /ptype KRB5_NT_PRINCIPAL /kvno 0 /crypto RC4-HMAC-NT.
```

In this scenario, the command will be:

```
ktpass.exe /princ HTTP/server.example.com@EXAMPLE.COM /pass "aA@123456" /mapuser "EXAMPLE\exoadmin" /out server.keytab /ptype KRB5_NT_PRINCIPAL /kvno 0 /crypto RC4-HMAC-NT
```

```
ktpass.exe ﻿/princ HTTP/localhost@DATALAYER.IO /mapuser dlauser@DATALAYER.IO /pass xxx /ptype KRB5_NT_PRINCIPAL /out activedirectory.keytab
ktpass.exe ﻿/princ HTTP/localhost@DATALAYER.IO /mapuser test@DATALAYER.IO /pass xxx /ptype KRB5_NT_PRINCIPAL /out activedirectory.keytab
```

/crypto AES128-SHA1

In this step, the $hostname.keytab file (that is, server.keytab) will be generated.

Transfer the activedirectory.keytab to a linux machine and check it.

```
sudo chown datalayer:datalayer activedirectory.keytab
sudo chmod 400 activedirectory.keytab
sudo mv activedirectory.keytab /etc/security/keytabs
klist -ket /etc/security/keytabs/activedirectory.keytab
kdestroy
kinit -kt /etc/security/keytabs/activedirectory.keytab HTTP/localhost@DATALAYER.IO
klist -e
```

Or...

```
ktab.exe -a dlauser xxx -k activedirectory.keytab
```

# Azure Active Directory (AAD)

Kerberos and LDAP will work in on-premise or hybrid cloud/vpn scenarios.

+ http://azure.microsoft.com/en-us/services/active-directory
+ https://msdn.microsoft.com/en-us/library/azure/dn645545.aspx
+ https://msdn.microsoft.com/en-us/library/azure/dn195591.aspx

Depending on the scenario it may be feasible to consider AAD and oAuth2.

+ http://blogs.technet.com/b/ad/archive/2015/08/12/azure-ad-microsoft-account-preview-sign-in-personal-and-work-accounts-using-a-single-stack.aspx

# Applications

Login

+ https://login.microsoftonline.com
 + https://login.live.com (live)

Services

= https://portal.office.com
 + http://office.live.com (live)

+ https://www.onenote.com
 + https://onedrive.live.com

## 1. Azure

+ https://manage.windowsazure.com

## 2. Windows Live

+ https://account.live.com/developers/applications

+ Create Application: Create an application and get your `Client ID` and `Client Secret` - https://account.live.com/developers/applications/create
+ List Applications: https://account.live.com/developers/applications/index
+ Authenticate with OAuth2 - https://msdn.microsoft.com/en-us/library/hh243647.aspx
+ User Consent Manage consent you gave on applications:  https://account.live.com/consent/Manage?mkt=en-US

## 3. Model 2

+ https://apps.dev.microsoft.com

# API

## Outlook

+ https://dev.outlook.com
+ https://dev.outlook.com/RestGettingStarted
+ https://apps.dev.microsoft.com/#/appList
+ https://dev.outlook.com/AppRegistration
+ https://msdn.microsoft.com/en-us/library/azure/dn645543.aspx

## OneDrive

+ https://dev.onedrive.com/

## OneNote

+ http://dev.onenote.com

## Bing

+ https://msdn.microsoft.com/en-us/library/bing-ads-user-authentication-oauth-guide.aspx
