---
title: Web Scraping
---

# Web Scraping

> Web scraping, web harvesting, or web data extraction is data scraping used for extracting data from websites. Web scraping software may access the World Wide Web directly using the Hypertext Transfer Protocol, or through a web browser. [Wikipedia](https://en.wikipedia.org/wiki/Web_scraping).

+ JSoup
+ Java Selenium
+ Python Selenium
+ Bridge Browser
+ https://developer.mozilla.org/en/HTML/Canvas
+ https://developer.mozilla.org/En/Code_snippets/Canvas
+ https://developer.mozilla.org/index.php?title=En/Code_snippets/File_I%2F%2FO
+ http://groups.google.com/group/mozilla.dev.tech.dom/browse_thread/thread/3457e9ff4a2d2533/f6abd1ec632fe423?pli=1
+ http://tc.labs.opera.com/html/canvas/toDataURL/
+ http://cow.neondragon.net/index.php/681-Canvas-Todataurl
+ Mozilla via XulRunner
+ https://addons.mozilla.org/en-US/firefox/addon/remote-xul-manager
+ https://developer.mozilla.org/en-US/docs/Using_Remote_XUL
+ $GRE_HOME/xulrunner /a/bridge/browser/src/main/resources/xul-app/spl/application.ini
+ $GRE_HOME/xulrunner /a/bridge/browser/src/main/resources/xul-app/canvas/application.ini
+ -XX:PermSize=1g -Xmx2g -XstartOnFirstThread
+ mozilla-central-8ad43371c469-javaxpcom
+ Mozilla via SWT
+ Mozilla via Selenium

```
go all
go
go //java/server/src/org/openqa/selenium/remote/server:server:uber //java/client/src/org/openqa/selenium:client-combined:project
go //java/client/src/org/openqa/selenium:client-combined:uber
go //java/server/src/org/openqa/grid/selenium:selenium:project-srcs
cd maven
mvn install
```

+ Mozilla via JavaXPCOM

+ javaxpcom mozilla-central-javaxpcom mozilla-central-8ad43371c469-javaxpcom
+ [https://bugs.eclipse.org/bugs/show_bug.cgi?id=327696] [Browser] implement support for xulrunner >= 4.0
+ 8ad43371c469
+ see https://bugs.eclipse.org/bugs/show_bug.cgi?id=327696
+ http://hg.mozilla.org/mozilla-central/file/8ad43371c469
+ http://hg.mozilla.org/mozilla-central/log/67688
+ Here's the last Mozilla revision with JavaXPCOM: http://hg.mozilla.org/mozilla-central/file/8ad43371c469/extensions/java/xpcom
+ Benjamin Smedberg embedded maintainer javaxpcom
+ There is interest in getting JavaXPCOM back. I was in contact with Benjamin Smedberg (the Mozilla embedding maintainer) about this. He is willing to create a public repository on hg.mozilla.org.
+ His advice is "rewriting" the Java code generation based on the new Python xpidl generator (xpidl.py) because the old C-based xpidl generator is dead.
+ So basically you would take a xulrunner SDK release and let the Java xpidl generator run over it to generate the Java classes and build a JNI JavaXPCOM DLL.
+ Here's the last Mozilla revision with JavaXPCOM: http://hg.mozilla.org/mozilla-central/file/8ad43371c469/extensions/java/xpcom

+ Mozilla via XulRunner via JavaXPCOM
