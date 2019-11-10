---
title: Visualization with WISP
---

# Visualization with WISP

## WISP with Highcharts

First, import:

```
import com.quantifind.charts.highcharts    // Import the types.
import com.quantifind.charts.Highcharts._  // Import the implicit conversions.
```

Simple Example.

```
help
line((1 to 10), (1 to 10))
areaspline(List(1, 2, 3, 4, 5), List(4, 1, 3, 2, 6))
pie(Seq(4, 4, 5, 9))
```

The Highcharts implementation attempts to closely follow the Highcharts API.
We make some concessions to support alternative default values, and to accommodate the differences between 
javascript and scala while preserving simplicity (such as 22-field case classes).

After import, you can instantiate an object like so:

```
Highchart(Seq(Series(Seq(Data(1, 2)))), chart = Chart(zoomType = Zoom.xy), yAxis = None)
```

The current repl API supports the original series types from 3.0.6 and we are slowly updating to 4.0.4. 
You can pass any highchart object to plot, or use methods defined by the Highcharts plot type (recommended),
 which consume both data and functions: area, areaspline, bar, column, line, pie, scatter, spline.
 
By means of example:

```
areaspline(List(1, 2, 3, 4, 5), List(4, 1, 3, 2, 6))
areaspline
pie(Seq(4, 4, 5, 9))
```

You can pass in

+ an Iterable[Numeric]
+ an Iterable[(Numeric, Numeric)]
+ an (Iterable[Numeric], Iterable[Numeric])
+ an (Iterable[Numeric], Numeric => Numeric)
+ an (Numeric => Numeric, Iterable[Numeric])

To any of these functions. All of the following produce the same graph:

```
line((0 until 5).map(x => x -> x*x))
line(Seq(0, 1, 4, 9, 16))
line(List(0, 1, 2, 3, 4), Set(0, 1, 9, 16, 4).toSeq,sorted)
def f(x: Int): Int = scala.math.pow(x, 2).toInt
line(0 to 4, f _)
```

We are developing further support for more customized plots. For example, linear-regression:

```
regression((0 until 100).map(x => -x + scala.util.Random.nextInt(25)))
```

You can then make stylistic changes to your plot. You can add a title, xAxis, yAxis, legend, as well as hold and unhold plots, which causes plots to layer on top-of each other, and change the plots to be stacked, where appropriate:

```
import com.quantifind.charts.Highcharts._
bar((0 until 20).map(_ % 8))
hold
bar((0 until 20).map(_ % 4))
stack()
title("Stacked Bars")
xAxis("Quantity")
yAxis("Price")
legend(List("Blue", "Black"))
```

## WISP with Vega

First, import:

```
import com.quantifind.charts.repl.Vega._
bar((0 until 6) ++ (0 until 6).reverse)
```
