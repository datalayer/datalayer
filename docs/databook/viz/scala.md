---
title: Visualization with Scala
---

# Visualization with Scala

## Scala-Chart

```scala
import scalax.chart.api._
val data = for (i <- 1 to 5) yield (i,i)
val chart = XYLineChart(data, title = "My Chart of Some Points")
chart.show()
chart.saveAsPNG("chart.png")
chart.saveAsJPEG("chart.jpg")
chart.saveAsPDF("chart.pdf")
```

With animations.

```scala
import scalax.chart.api._
val series = Seq[(Int,Int)]() toXYSeries "f(x) = sin(x)"
val chart = XYLineChart(series)
chart.show()
for (x <- -4.0 to 4 by 0.1) {
  swing.Swing onEDT {
    series.add(x, math.sin(x))
  }
  Thread.sleep(50)
}
```

### Plot Server

When you first create a plot, wisp will attempt to fetch your ip using 
`java.net.InetAddress.getLocalHost.getCanonicalHostName` and start a server on a random port. 

It then tries to open the page in your browser using the unix command open.

You can also manually startServer() and stopServer(). 

The server maintains the history, and you can undo(), redo(), clear() or clearAll() (which hides a plot) 
and delete() or deleteAll() (which truly deletes the plot)

## Plot with Scalaplot

```scala
import org.sameersingh.scalaplot.Implicits._
import java.lang.Math._
val x = 0.0 until 2.0 * math.Pi by 0.1
output(ASCII, plot(x ->(sin(_))))
output(ASCII, plot(x ->(cos(_))))
output(ASCII, plot(x ->(sin(_), cos(_))))
output(GUI, plot(x ->(sin(_), cos(_))))
output(PNG("target/", "test"), plot(x ->(sin(_), cos(_))))
output(PDF("target/", "test"), plot(x ->(sin(_), cos(_))))
```

You can also use directly the plotters.

```scala
val plot = plot(x ->(math.sin(_), math.cos(_)))
val gnuplotter = new org.sameersingh.scalaplot.gnuplot.GnuplotPlotter(plot)
gnuplotter.pdf("target/", "gnu-plot")
val jplotter = new org.sameersingh.scalaplot.jfreegraph.JFGraphPlotter(plot)
jplotter.gui()
```

Read more on https://github.com/sameersingh/scalaplot for options.

## Breeze-Viz

The following does not work for now (don't try it).

```scala
import breeze.linalg._
import breeze.stats.distributions._
val x = DenseMatrix.fill(10,10)(Gaussian(0,1).draw())
```

```scala
import breeze.linalg._
import breeze.plot._
val f = Figure()
val p = f.subplot(0)
val x = linspace(0.0,1.0)
p += plot(x, x :^ 2.0)
p += plot(x, x :^ 3.0, '.')
p.xlabel = "x axis"
p.ylabel = "y axis"
f.saveas("target/lines.png")
```

```scala
val p2 = f.subplot(2,1,1)
val g = breeze.stats.distributions.Gaussian(0,1)
p2 += hist(g.sample(100000),100)
p2.title = "A normal distribution"
f.saveas("target/subplots.png")
```

```scala
val f2 = Figure()
f2.subplot(0) += image(DenseMatrix.rand(200,200))
f2.saveas("image.png")
```

```scala
import breeze.plot._
import breeze.linalg.DenseVector
import java.awt.Color
 val x = DenseVector.rand(10)
val y = DenseVector.rand(10)
// val s = DenseVector.rand(10) :/ 5.0
// val si = s.mapValues(_.toInt)
val sj : PartialFunction[Int,Double] = Map(1->1.0, 4->4.0)
val sj : PartialFunction[Int,Double] = {case i : Int => println("++++++++++" + i); i.toDouble}
val labels : PartialFunction[Int,String] = Map(1->"Red", 4->"Blue")
val labels : PartialFunction[Int,String] = {case i : Int => i.toString}
val tips : PartialFunction[Int,String] = {case i : Int => i.toString}
// plot #1
val literalColors : PartialFunction[Int,Color] = Map(1->Color.RED, 4->Color.BLUE) orElse { case x : Int => Color.WHITE } 
scatter(x, y, sj, literalColors, labels=labels, tips=tips)
val f = Figure()
val p = f.subplot(0)
p += scatter(x, y, sj, literalColors, labels=labels, tips=tips)
 // plot #2
val c = DenseVector.rand(10);
val paintScale = GradientPaintScale(0.0, 1.0)
val scaleColors = Map() ++ (0 until c.length).map(i => (i, paintScale(c(i))));
scatter(x, y, sj, scaleColors, labels = labels, tips = tips) 
val f = Figure()
val p = f.subplot(0)
p += scatter(x, y, sj, scaleColors, labels=labels, tips=tips)
```
