---
title: Scala
---

# Scala

> [Scala](https://www.scala-lang.org) combines object-oriented and functional programming in one concise, high-level language. Scala's static types help avoid bugs in complex applications, and its JVM and JavaScript runtimes let you build high-performance systems with easy access to huge ecosystems of libraries.

## Shell

```
$ scala -version
Scala code runner version 2.11.2 -- Copyright 2002-2013, LAMP/EPFL

$ scala -help
Usage: scala <options> [<script|class|object|jar> <arguments>]
   or  scala -help

All options to scalac (see scalac -help) are also allowed.

The first given argument other than options to scala designates
what to run.  Runnable targets are:

+ a file containing scala source
+ the name of a compiled class
+ a runnable jar file with a valid Main-Class attribute
+ or if no argument is given, the repl (interactive shell) is started

Options to scala which reach the java runtime:

 -Dname=prop  passed directly to java to set system properties
 -J<arg>      -J is stripped and <arg> passed to java as-is
 -nobootcp    do not put the scala jars on the boot classpath (slower)

Other startup options:

 -howtorun    what to run <script|object|jar|guess> (default: guess)
 -i <file>    preload <file> before starting the repl
 -e <string>  execute <string> as if entered in the repl
 -save        save the compiled script in a jar for future use
 -nc          no compilation daemon: do not use the fsc offline compiler

A file argument will be run as a scala script unless it contains only
self-contained compilation units (classes and objects) and exactly one
runnable main method.  In that case the file will be compiled and the
main method invoked.  This provides a bridge between scripts and standard
scala source.

$ scala
Welcome to Scala version 2.10.4 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_20-ea).
Type in expressions to have them evaluated.
Type :help for more information.

scala> :help
All commands can be abbreviated, e.g. :he instead of :help.
Those marked with a * have more detailed help, e.g. :help imports.

:cp <path>                 add a jar or directory to the classpath
:help [command]            print this summary or command-specific help
:history [num]             show the history (optional num is commands to show)
:h? <string>               search the history
:imports [name name ...]   show import history, identifying sources of names
:implicits [-v]            show the implicits in scope
:javap <path|class>        disassemble a file or class name
:load <path>               load and interpret a Scala file
:paste                     enter paste mode: all input up to ctrl-D compiled together
:power                     enable power user mode
:quit                      exit the interpreter
:replay                    reset execution and replay all previous commands
:reset                     reset the repl to its initial state, forgetting all session entries
:sh <command line>         run a shell command (result is implicitly => List[String])
:silent                    disable/enable automatic printing of results
:type [-v] <expr>          display the type of an expression without evaluating it
:warnings                  show the suppressed warnings from the most recent line which had any

scala> println("Scala is installed!")
Scala is installed!

scala> for(a <- 1 to 3) {
     |    println( "Value of a: " + a );
     | }
Value of a: 1
Value of a: 2
Value of a: 3

scala> :q

$ scala -e "println(\"hello\")"
```

## File from Command

$ vi HelloWorld.scala

```
object HelloWorld {
  def main(args: Array[String]) {
    println("Hello, world!")
  }
}
```

```
$ scala HelloWorld.scala
$ scala -i HelloWorld.scala
$ scalac HelloWorld.scala
$ scala -cp . HelloWorld
```

# Embed and run Scala from a Shell

On unix-flavored systems:

```
#!/bin/sh
exec scala "$0" "$@"
!#
// Say hello to the first argument
println("Hello, "+ args(0) +"!")
```

On windows:

```
::#!
@echo off
call scala % 0 % *
goto :eof
::!#
```

## Eclipse

For a Scala file:

+ CMD+SHIFT+X to run selected code in a REPL
+ CTRL+ENTER to evaluate in a REPL

For a Sheet file:

+ CMD+SHIFT+B to run.
+ CTRL+SHIFT+F to format.
+ CTRL+SHIFT+C to clean.

## Underscore Usage

Existential types

def foo(l: List[Option[_]]) = ...

Higher kinded type parameters

case class A[K[_],T](a: K[T])

Ignored variables

val _ = 5

Ignored parameters

List(1, 2, 3) foreach { _ => println("Hi") }

Wildcard patterns

Some(5) match { case Some(_) => println("Yes") }

Wildcard imports

import java.util._

Hiding imports

import java.util.{ArrayList => _, _}

Joining letters to punctuation

def bang_!(x: Int) = 5

Assignment operators

def foo_=(x: Int) { ... }

Placeholder syntax

List(1, 2, 3) map (_ + 2)

Partially applied functions

List(1, 2, 3) foreach println _

There may be others I have forgotten!

Example showing why foo(_) and foo _ are different:

This example comes from 0__:

trait PlaceholderExample {
  def process[A](f: A => Unit)

  val set: Set[_ => Unit]

  set.foreach(process _) // Error 
  set.foreach(process(_)) // No Error
}

In the first case, process _ represents a method; Scala takes the polymorphic method and attempts to make it monomorphic by filling in the type parameter, but realizes that there is no type that can be filled in for A that will give the type (_ => Unit) => ? (Existential _ is not a type).

In the second case, process(_) is a lambda; when writing a lambda with no explicit argument type, Scala infers the type from the argument that foreach expects, and _ => Unit is a type (whereas just plain _ isn't), so it can be substituted and inferred.

This may well be the trickiest gotcha in Scala I have ever encountered

# Run Scala from Java

```
export BOOT_CLASSPATH="-Xbootclasspath/a:$SCALA_HOME/lib/akka-actors.jar:$SCALA_HOME/lib/jline.jar:$SCALA_HOME/lib/scala-actors.jar:$SCALA_HOME/lib/scala-actors-migration.jar:$SCALA_HOME/lib/scala-compiler.jar:$SCALA_HOME/lib/scala-library.jar:$SCALA_HOME/lib/scalap.jar:$SCALA_HOME/lib/scala-reflect.jar:$SCALA_HOME/lib/scala-swing.jar:$SCALA_HOME/lib/typesafe-config.jar"
java $BOOT_CLASSPATH -Dscala.usejavacp=true -Dscala.home="$SCALA_HOME" scala.tools.nsc.MainGenericRunner HelloWorld.scala
```

# Run Scala from Eclipse

+ Run as Application (Right-click and select Run As > Scala Application) - You need a main method (or your class should extends App)
+ Open the Scala Interpreter window (via menu Window, Show View), select code in Eclipse editor and type CTRL+SHIFT+X (see e.g. sandbox.scala)
 + To evaluate an expression, type CTRL+ENTER
+ Create a Scala Worksheet (read more https://github.com/scala-ide/scala-worksheet/wiki/Getting-Started - You must install the plugin separately) - Save the sheel (or CTRL-SHIFT-?) will run the sheet - CTRL-SHIFT-C will clear the output.
+ Run io.aos.scala.repl.DlaRepl

A class is a blueprint for objects. Once you define a class, you can create objects from the class blueprint with the keyword new. Following is a simple syntax to define a class in Scala:

class Point(xc: Int, yc: Int) {
   var x: Int = xc
   var y: Int = yc

   def move(dx: Int, dy: Int) {
      x = x + dx
      y = y + dy
      println ("Point x location : " + x);
      println ("Point y location : " + y);
   }
}

This class defines two variables x and y and a method: move, which does not return a value. Class variables are called, fields of the class and methods are called class methods.

The class name works as a class constructor which can take a number of parameters. The above code defines two constructor arguments, xc and yc; they are both visible in the whole body of the class.

As mentioned earlier, you can create objects using a keyword new and then you can access class fields and methods as shown below in the example:

import java.io._

class Point(val xc: Int, val yc: Int) {
   var x: Int = xc
   var y: Int = yc
   def move(dx: Int, dy: Int) {
      x = x + dx
      y = y + dy
      println ("Point x location : " + x);
      println ("Point y location : " + y);
   }
}

object Test {
   def main(args: Array[String]) {
      val pt = new Point(10, 20);

      // Move to a new location
      pt.move(10, 10);
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
Point x location : 20
Point y location : 30

$ 

Extending a Class:

You can extend a base scala class in similar way you can do it in Java but there are two restrictions: method overriding requires the override keyword, and only the primary constructor can pass parameters to the base constructor. Let us extend our above class and add one more class method:

class Point(val xc: Int, val yc: Int) {
   var x: Int = xc
   var y: Int = yc
   def move(dx: Int, dy: Int) {
      x = x + dx
      y = y + dy
      println ("Point x location : " + x);
      println ("Point y location : " + y);
   }
}

class Location(override val xc: Int, override val yc: Int,
   val zc :Int) extends Point(xc, yc){
   var z: Int = zc

   def move(dx: Int, dy: Int, dz: Int) {
      x = x + dx
      y = y + dy
      z = z + dz
      println ("Point x location : " + x);
      println ("Point y location : " + y);
      println ("Point z location : " + z);
   }
}

Such an extends clause has two effects: it makes class Location inherit all non-private members from class Point, and it makes the type Location a subtype of the type Point class. So here the Point class is called superclass and the class Location is called subclass. Extending a class and inheriting all the features of a parent class is called inheritance but scala allows the inheritance from just one class only. Let us take complete example showing inheirtance:

import java.io._

class Point(val xc: Int, val yc: Int) {
   var x: Int = xc
   var y: Int = yc
   def move(dx: Int, dy: Int) {
      x = x + dx
      y = y + dy
      println ("Point x location : " + x);
      println ("Point y location : " + y);
   }
}

class Location(override val xc: Int, override val yc: Int,
   val zc :Int) extends Point(xc, yc){
   var z: Int = zc

   def move(dx: Int, dy: Int, dz: Int) {
      x = x + dx
      y = y + dy
      z = z + dz
      println ("Point x location : " + x);
      println ("Point y location : " + y);
      println ("Point z location : " + z);
   }
}

object Test {
   def main(args: Array[String]) {
      val loc = new Location(10, 20, 15);

      // Move to a new location
      loc.move(10, 10, 5);
   }
}

Note that methods move and move do not override the corresponding definitions of move since they are different definitions (for example, the former take two arguments while the latter take three arguments). When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
Point x location : 20
Point y location : 30
Point z location : 20

$ 

Singleton objects:

Scala is more object-oriented than Java because in Scala we cannot have static members. Instead, Scala has singleton objects. A singleton is a class that can have only one instance, i.e., object. You create singleton using the keyword object instead of class keyword. Since you can't instantiate a singleton object, you can't pass parameters to the primary constructor. You already have seen all the examples using singleton objects where you called Scala's main method. Following is the same example of showing singleton:

import java.io._

class Point(val xc: Int, val yc: Int) {
   var x: Int = xc
   var y: Int = yc
   def move(dx: Int, dy: Int) {
      x = x + dx
      y = y + dy
   }
}

object Test {
   def main(args: Array[String]) {
      val point = new Point(10, 20)
      printPoint

      def printPoint{
         println ("Point x location : " + point.x);
         println ("Point y location : " + point.y);
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
Point x location : 10
Point y location : 20

To debug scala class loading, launch with JVM args `-verbose:class`.

# Basics

A for loop is a repetition control structure that allows you to efficiently write a loop that needs to execute a specific number of times. 

There are various forms of for loop in Scala which are described below: 

The for Loop with Ranges

The simplest syntax of a for loop in Scala is:

for(var x <- Range) {
  statement(s);
}

Here, the Range could be a range of numbers and that is represented as i to j or sometime like i until j. The left-arrow <- operator is called a generator, so named because it's generating individual values from a range.

Example: Following is the example of for loop with range using i to j syntax:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 to 10) {
         println( "Value of a: " + a );
      }
   }
}

object Test {
   def t() {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 to 10){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6
value of a: 7
value of a: 8
value of a: 9
value of a: 10

$

Following is the example of for loop with range using i until j syntax:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 until 10){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6
value of a: 7
value of a: 8
value of a: 9

$

You can use multiple ranges separated by semicolon (;) within a for loop and in that case loop will iterate through all the possible computations of the given ranges. Following is an example of using just two ranges, you can use more than two ranges as well.

object Test {
   def main(args: Array[String]) {
      var a = 0;
      var b = 0;
      // for loop execution with a range
      for( a <- 1 to 3; b <- 1 to 3){
         println( "Value of a: " + a );
         println( "Value of b: " + b );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
Value of a: 1
Value of b: 1
Value of a: 1
Value of b: 2
Value of a: 1
Value of b: 3
Value of a: 2
Value of b: 1
Value of a: 2
Value of b: 2
Value of a: 2
Value of b: 3
Value of a: 3
Value of b: 1
Value of a: 3
Value of b: 2
Value of a: 3
Value of b: 3

$

The for Loop with Collections

The syntax of a for loop with collection is as follows:

for( var x <- List ){
   statement(s);
}

Here, the List variable is a collection type having a list of elements and for loop iterate through all the elements returning one element in x variable at a time.
Example:

Following is the example of for loop with a collection of numbers. Here we created this collection using List(). We will study collections in a separate chapter.

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6);

      // for loop execution with a collection
      for( a <- numList ){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6

$

The for Loop with Filters

Scala's for loop allows to filter out some elements using one or more if statement(s). Following is the syntax of for loop along with filters.

for( var x <- List
      if condition1; if condition2...
   ){
   statement(s);
}

To add more than one filter to a for expression, separate the filters with semicolons(;).
Example:

Following is the example of for loop along with filters:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6,7,8,9,10);
      // for loop execution with multiple filters
      for( a <- numList
           if a != 3; if a < 8 ){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 4
value of a: 5
value of a: 6
value of a: 7

$

The for Loop with yield:

You can store return values from a for loop in a variable or can return through a function. To do so, you prefix the body of the for expression by the keyword yield as follows:

var retVal = for{ var x <- List
     if condition1; if condition2...
}yield x

Note the curly braces have been used to keep the variables and conditions and retVal is a variable where all the values of x will be stored in the form of collection.
Example:

Following is the example to show the usage of for loop along with yield:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6,7,8,9,10);
      // for loop execution with a yield
      var retVal = for{ a <- numList 
                        if a != 3; if a < 8
                      }yield a
      // Now print returned values using another loop.
      for( a <- retVal){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 4
value of a: 5
value of a: 6
value of a: 7

$ scala
scala> val a = 1
a: Int = 1
scala> var b = 2
b: Int = 2
scala> b = b + a
b: Int = 3
scala> a = 2
<console>6: error: reassignment to val
       a = 2
         ^
scala> def square(x: Int) = x*x
square: (x: Int)Int
scala> square(3)
res0: Int = 9
scala> square(res0)
res1: Int = 81

scala> class Dog( name: String ) {
     |   def bark() = println(name + " barked")
     | }
defined class Dog
scala> val stubby = new Dog("Stubby")
stubby: Dog = Dog@1dd5a3d
scala> stubby.bark
Stubby barked
scala>

In [1]: 1
Out[1]: 1

In [2]: 1 + 2 + 3
Out[2]: 6

In [3]: (1 to 5).foreach { i => println(i); Thread.sleep(1000) }
1
2
3
4
5

In [4]: val x = 1
Out[4]: 1

In [5]: x
Out[5]: 1

In [6]: 100*x + 17
Out[6]: 117

In [7]: x.<TAB>
x.%             x.-             x.>>            x.isInstanceOf  x.toFloat       x.toString      x.|
x.&             x./             x.>>>           x.toByte        x.toInt         x.unary_+
x.*             x.>             x.^             x.toChar        x.toLong        x.unary_-
x.+             x.>=            x.asInstanceOf  x.toDouble      x.toShort       x.unary_~

In [7]: x.to<TAB>
x.toByte    x.toChar    x.toDouble  x.toFloat   x.toInt     x.toLong    x.toShort   x.toString

In [7]: x.toS<TAB>
x.toShort   x.toString

In [7]: 1/0
java.lang.ArithmeticException: / by zero

In [8]: java.util.UUID.fromString("abc")
java.lang.IllegalArgumentException: Invalid UUID string: abc
    java.util.UUID.fromString(UUID.java:226)

In [9]: class Foo(a: Int) { def bar(b: String) = b*a }

In [10]: new Foo(5)
Out[10]: Foo@70f4d063

In [11]: _10.bar("xyz")
Out[11]: xyzxyzxyzxyzxyz

In [12]: import scala.language.experimental.macros

In [13]: import scala.reflect.macros.Context

In [14]: object Macros {
    ...:     def membersImpl[A: c.WeakTypeTag](c: Context): c.Expr[List[String]] = {
    ...:         import c.universe._
    ...:         val tpe = weakTypeOf[A]
    ...:         val members = tpe.declarations.map(_.name.decoded).toList.distinct
    ...:         val literals = members.map(member => Literal(Constant(member)))
    ...:         c.Expr[List[String]](Apply(reify(List).tree, literals))
    ...:     }
    ...:
    ...:     def members[A] = macro membersImpl[A]
    ...: }
    ...:

In [15]: Macros.members[Int]
Out[15]: List(<init>, toByte, toShort, toChar, toInt, toLong, toFloat, toDouble, unary_~,
unary_+, unary_-, +, <<, >>>, >>, ==, !=, <, <=, >, >=, |, &, ^, -, *, /, %, getClass)

### Class

object A {
  val ms: Seq[String => String] = Seq(m1)
  def m1(s: String) = s
}
A.ms.map(m => m.getClass.getSimpleName)

## Bound Variables

To get all variables in scope:

```
$intp.definedTerms.foreach(println)
```
