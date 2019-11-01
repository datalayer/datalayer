---
title: Console
---

# Console

```bash
# Powerline.
https://github.com/b-ryan/powerline-shell
# Use `Meslo LG S for Powerline` font family.
https://github.com/powerline/fonts
```

```bash
# See.
+ https://github.com/spring-projects/spring-shell.git
+ https://github.com/crashub/crash.git
+ https://github.com/fusesource/jansi.git
+ https://github.com/spring-projects/rest-shell.git
```

```bash
# For a colored console.
+ http://stackoverflow.com/questions/5762491/how-to-print-color-in-console-using-system-out-println
+ http://code.google.com/p/clamshell-cli/
+ http://jansi.fusesource.org/
+ http://www.diogonunes.com/it/work/jcdp/
+ https://github.com/vladimirvivien/jmx-cli
```

```bash
# For CLI parser.
+ http://jcommander.org
+ https://github.com/airlift/airline
```

```bash
# For ASCII fonts.
+ http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something
```

```bash
# For ASCII art.
+ http://sourceforge.net/projects/asciiart
++ http://sourceforge.net/p/asciiart/code/ci/master/tree
++ http://www.alcibiade.org
```

```bash
# For ASCII diagram.
echo http://ditaa.sourceforge.net
echo http://sourceforge.net/p/ditaa/svn/HEAD/tree
```

## Colors

```bash
# https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/tools/screenshotTable.sh
T='Datalayer'   # The test text

echo -e "\n                 40m     41m     42m     43m\
     44m     45m     46m     47m";

for FGs in '    m' '   1m' '  30m' '1;30m' '  31m' '1;31m' '  32m' \
           '1;32m' '  33m' '1;33m' '  34m' '1;34m' '  35m' '1;35m' \
           '  36m' '1;36m' '  37m' '1;37m';
  do FG=${FGs// /}
  echo -en " $FGs \033[$FG  $T  "
  for BG in 40m 41m 42m 43m 44m 45m 46m 47m;
    do echo -en "$EINS \033[$FG\033[$BG  $T  \033[0m";
  done
  echo;
done
echo
```

## Hyper.js

[Hyper.js](https://hyper.is).

```bash
# fontFamily: '"Meslo LG S for Powerline", Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
vi ~/.hyper.js
```

```bash
hyper install hyperpower #wow
hyper list
```

Hyper.js Plugin Example

+ https://hyper.is
+ https://github.com/zeit/hyper
+ https://github.com/bnb/awesome-hyper
+ https://github.com/zeit/hyperpower
+ https://hyper.is/plugins

## REPL

## Spark with HDP 2.3

HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put README.md /tmp
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp

```
DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-cli
```

```
val f = sc.textFile("/tmp/README.md")
val a = f.filter(line => line.contains("a")).count()
val b = f.filter(line => line.contains("b")).count()
println("Lines with a: %s, Lines with b: %s".format(a, b))
f.filter(line => line.contains("a")).saveAsTextFile("/tmp/a.md")
```

```
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp/a.md
```

# Scala REPL

def showLocals = intp.definedTerms.foreach(x => println(s"$x ${intp.typeOfTerm(x.toString)}"))

# Datalayer REPL

The Datalayer REPL allows you to Read, Evaluate, Print, Loop via a simple shell in your favorite terminal.

It imports useful libraries that help your life.

# Build and install the REPL

```
mvn install -DskipTests
```

# Run Datalayer Scala REPL

Invoke `./bin/datalayer-scala` from the root folder (where the pom.xml resides).

# Run Datalayer Spark REPL

Invoke `./bin/datalayer-spark` from the root folder (where the pom.xml resides).

# Context

z.show(yourDataFrame)

# Dependencies

```
%dep

z.reset() // clean up previously added artifact and repository

// add maven repository
z.addRepo("RepoName").url("RepoURL")

// add maven snapshot repository
z.addRepo("RepoName").url("RepoURL").snapshot()

// add artifact from filesystem
z.load("/path/to.jar")

// add artifact from maven repository, with no dependency
z.load("groupId:artifactId:version").excludeAll()

// add artifact recursively
z.load("groupId:artifactId:version")

// add artifact recursively except comma separated GroupID:ArtifactId list
z.load("groupId:artifactId:version").exclude("groupId:artifactId,groupId:artifactId, ...")

// exclude with pattern
z.load("groupId:artifactId:version").exclude(*)
z.load("groupId:artifactId:version").exclude("groupId:artifactId:*")
z.load("groupId:artifactId:version").exclude("groupId:*")

// local() skips adding artifact to spark clusters (skipping sc.addJar())
z.load("groupId:artifactId:version").local()

a. Load elasticsearch-hadoop library and distribute to spark cluster (sc.addJar()) but exclude some transitive dependencies, like cascading-local, pig, etc.

  z.loadAndDist("org.elasticsearch:elasticsearch-hadoop:2.0.2", 
    Seq("cascading:cascading-local",
        "cascading:cascading-hadoop",
        "org.apache.pig:pig",
        "joda-time:joda-time",
        "org.apache.hive:hive-service"))

b. Add local .m2 repository and load library from it

  z.addMavenRepo("local", "file:///Users/moon/.m2/repository")
  z.load("org.apache.zeppelin:zeppelin-markdown:0.5.0-SNAPSHOT")

c. Add remote maven repository (snapshot, https protocol) and load a library from it

  z.addMavenRepo("snapshot", "https://oss.sonatype.org/content/repositories/snapshots/", true)
  z.load("org.apache.zeppelin:markdown:0.5.0-SNAPSHOT")
```

### Kuber

Kuber is a command line interface to interact, interpret Apache Zeppelin notes.
 
It also allows you to import/export IPython Jupyter and convert to images and PDF.

[![Kuber](https://datalayer.io/ext/screenshots/datalayer-kuber.png)](https://datalayer.io/kuber)

Build and launch the executable jar:

```
mvn install
./target/datalayer-kuber-1.0.0-SNAPSHOT.jar
```

The foundations and a few functionalities are available today:

Shell Functionalites

+ Interact
+ Interpret

Import from and Export To:

+ IPython Jupyter
+ Spark Notebook
+ Shiny

Export to:

+ Images
+ PDF

```
Welcome to Kuber
             ___       __       __
   _______  / _ \___ _/ /____ _/ /__ ___ _____ ____
  _______  / // / _ `/ __/ _ `/ / _ `/ // / -_) __/
 _______  /____/\_,_/\__/\_,_/_/\_,_/\_, /\__/_/
                                    /___/

 -> Type `help` to get started.

 (c) 2016 Datalayer https://datalayer.io
 
kuber> help

Kuber Help
--------------------

kuber> connect                      : Connect to the default localhost:8080 Apache Zeppelin Server
kuber> connect("localhost", 8080)   : Connect to Apache Zeppelin Server
kuber> close                        : Close the current connection
kuber> bye                          : Quit this REPL

kuber> notes                        : List the notes
kuber> note                         : Create a new note
kuber> note("id")                   : View a note by id

kuber> p("val i = 2")               : Run a code in a paragraph (use triple quote if needed)

(c) 2016 Datalayer https://datalayer.io

```

Planned features (by alphabetic order):s

+ Code completion
+ Contribute to Datalayer to have a better response on note creation (get id of created note)
+ Export note to PDF
+ Guard against NPE if not connected
+ Have a more user friendly way to kuber with quotes
+ Import note from IPython
+ Process responses and display them in formatted way
+ Status command
+ Support both server and client mode for interperters
+ Support Chromium, Safari (now only Firefox)
