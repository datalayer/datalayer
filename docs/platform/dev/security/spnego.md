---
title: Spnego
---

# Spnego

## Firefox

You can configure Firefox to use Kerberos for Single Sign-on. In order for this functionality to work correctly, you need to configure your web browser to send your Kerberos credentials to the appropriate KDC.The following section describes the configuration changes and other requirements to achieve this.

In the address bar of Firefox, type `about:config` to display the list of current configuration options.

+ In the Filter field, type `negotiate` to restrict the list of options.
+ Double-click the `network.negotiate-auth.trusted-uris` entry to display the Enter string value dialog box.
+ Enter the name of the domain against which you want to authenticate, for example, .example.com.

Repeat the above procedure for the 'network.negotiate-auth.delegation-uris' entry, using the same domain.

## Note

You can leave this value blank, as it allows Kerberos ticket passing, which is not required.
If you do not see these two configuration options listed, your version of Firefox may be too old to support Negotiate authentication, and you should consider upgrading.
⁠
You now need to ensure that you have Kerberos tickets. In a command shell, type kinit to retrieve Kerberos tickets. To display the list of available tickets, type klist. The following shows an example output from these commands:

```bash
$ kinit
Password for user@EXAMPLE.COM:
$ klist
Ticket cache: FILE:/tmp/krb5cc_10920
Default principal: user@EXAMPLE.COM
Valid starting     Expires            Service principal
10/26/06 23:47:54  10/27/06 09:47:54  krbtgt/USER.COM@USER.COM
        renew until 10/26/06 23:47:54
Kerberos 4 ticket cache: /tmp/tkt10920
klist: You have no tickets cached
```

## Debug

If you have followed the configuration steps above and Negotiate authentication is not working, you can turn on verbose logging of the authentication process. This could help you find the cause of the problem. To enable verbose logging, use the following procedure:

Close all instances of Firefox.

Open a command shell, and enter the following commands:

    export NSPR_LOG_MODULES=negotiateauth:5
    export NSPR_LOG_FILE=/tmp/moz.log

Restart Firefox from that shell, and visit the website you were unable to authenticate to earlier. Information will be logged to /tmp/moz.log, and may give a clue to the problem. For example:

    -1208550944[90039d0]: entering nsNegotiateAuth::GetNextToken()
    -1208550944[90039d0]: gss_init_sec_context() failed: Miscellaneous failure
    No credentials cache found

This indicates that you do not have Kerberos tickets, and need to run kinit. 

If you are able to run kinit successfully from your machine but you are unable to authenticate, you might see something like this in the log file:

    -1208994096[8d683d8]: entering nsAuthGSSAPI::GetNextToken()
    -1208994096[8d683d8]: gss_init_sec_context() failed: Miscellaneous failure
    Server not found in Kerberos database

This generally indicates a Kerberos configuration problem. Make sure that you have the correct entries in the [domain_realm] section of the /etc/krb5.conf file. For example:

    .example.com = EXAMPLE.COM
    example.com = EXAMPLE.COM

If nothing appears in the log it is possible that you are behind a proxy, and that proxy is stripping off the HTTP headers required for Negotiate authentication. As a workaround, you can try to connect to the server using HTTPS instead, which allows the request to pass through unmodified. Then proceed to debug using the log file, as described above. 

## Debug with Java

For Java code, run with: `-Dsun.security.krb5.debug=true -Dsun.security.spnego.debug=true`

For Hadoop, run with: `export HADOOP_OPTS='-Dsun.security.krb5.debug=true -Dsun.security.spnego.debug=true'`
