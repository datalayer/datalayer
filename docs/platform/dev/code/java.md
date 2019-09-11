---
title: Java
---

# Java

## Mac

```bash
export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"
```

## Maven

`mvn io.datalayer:datalayer-maven:hello`
`mvn io.datalayer:datalayer-maven:report`

```
<plugin>
        <groupId>aos-summer</groupId>
        <artifactId>aos-summer-i18n/artifactId>
        <executions>
                <execution>
                    <phase>generate-resources</phase>
                    <goals>
                            <goal>generateResourceBundle</goal>
                    </goals>
                </execution>
        </executions>
        <configuration>
                <resources>
                    <param>${project.basedir}/src/main/resources/aos/spl/MessageConstants.xls</param>
                    <param>${project.basedir}/src/main/resources/aos/spl/MessageConstantsWithParameter.xls</param>
                </resources>
                <outputDirectory>${project.build.directory}/generated-resources/aos/spl/</outputDirectory>
                <keyEscapeCharacters>
                    <escapeCharacter>
                            <source>_</source>
                            <target></target>
                    </escapeCharacter>
                </keyEscapeCharacters>
                <valueEscapeCharacters>
                    <escapeCharacter>
                            <source>'</source>
                            <target>''</target>
                    </escapeCharacter>
                </valueEscapeCharacters>
                
                
        </configuration>
</plugin>
```

@see https://github.com/adamfisk/LittleProxy/blob/master/pom.xml

# Tips

```
mvn release:prepare -Darguments="-DskipTests"
```

```
mvn install -Dmaven.findbugs.enable=false
```

```
mvn install -Dcheckstyle.skip=true
```

```
mvn dependency:unpack-dependencies build-helper:attach-test-classes (Running tests from a maven test-jar)
mvn dependency:sources
mvn dependency:resolve -Dclassifier=javadoc -DdownloadSources=true -DdownloadJavadocs=true
```

```
-Dmaven.javadoc.skip=true
```

```
<properties>
    <maven.javadoc.skip>true</maven.javadoc.skip>
</properties>
```

```
mvn deploy -DskipTests -DaltDeploymentRepository=sonatype-nexus-snapshots::default::https://oss.sonatype.org/content/repositories/snapshots
```

```
mvn deploy:deploy-file -Dfile=your-artifact-1.0.jar \
                         [-DpomFile=your-pom.xml] \
                         [-Dsources=src.jar] \
                         [-Djavadoc=apidocs.jar] \
                         [-DgroupId=org.some.group] \
                         [-DartifactId=your-artifact] \
                         [-Dversion=1.0] \
                         [-Dpackaging=jar] \
                         [-Dclassifier=sources] \
                         [-DgeneratePom=true] \
                         [-DcreateChecksum=true]
```

```
mvn deploy:deploy-file -Durl=file://C:\m2-repo \
                       -DrepositoryId=some.id \
                       -Dfile=your-artifact-1.0.jar \
                       [-DpomFile=your-pom.xml] \
                       [-DgroupId=org.some.group] \
                       [-DartifactId=your-artifact] \
                       [-Dversion=1.0] \
                       [-Dpackaging=jar] \
                       [-Dclassifier=test] \
                       [-DgeneratePom=true] \
                       [-DgeneratePom.description="My Project Description"] \
                       [-DrepositoryLayout=legacy] \
                       [-DuniqueVersion=false]
```

```
mvn deploy:deploy-file -Dfile=javauno-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=javauno -Dversion=3-SNAPSHOT -DpomFile=javauno-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
mvn deploy:deploy-file -Dfile=juh-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=juh -Dversion=3-SNAPSHOT -DpomFile=juh-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
mvn deploy:deploy-file -Dfile=jurt-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=jurt -Dversion=3-SNAPSHOT -DpomFile=jurt-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
mvn deploy:deploy-file -Dfile=ridl-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=ridl -Dversion=3-SNAPSHOT -DpomFile=ridl-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
mvn deploy:deploy-file -Dfile=unoil-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=unoil -Dversion=3-SNAPSHOT -DpomFile=unoil-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
mvn deploy:deploy-file -Dfile=unoloader-3-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=unoloader -Dversion=3-SNAPSHOT -DpomFile=unoloader-3-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
```

```
mvn deploy:deploy-file -Dfile=REngine-1.0.0-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=REngine -Dversion=1.0.0-SNAPSHOT -DpomFile=REngine-1.0.0-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
```

```
mvn deploy:deploy-file -Dfile=RserveEngine-1.0.0-SNAPSHOT.jar -DgroupId=io.datalayer -DartifactId=Rserve -Dversion=1.0.0-SNAPSHOT -DpomFile=Rserve-1.0.0-SNAPSHOT.pom -Dpackaging=jar -DrepositoryId=sonatype-nexus-snapshots -Durl=https://oss.sonatype.org/content/repositories/snapshots
```

```
mvn -pl '!submodule1-to-exclude,!module2-to-exclude' install
```

