---
title: Visualization with R
---

# Visualization with R

## Google Vis

Google Vis.

## rCharts

R Charts.

## Htmlwidgets

HTML Widgets.

## GNU Plot

```bash
gnuplot -p -e "plot 1/(1+exp(-0.18401*x+5.50508)), 1/(1+exp(- 0.7527*x+22.7536 ))" # zoom out to see the plot...
```

```bash
$ gnuplot
set datafile separator ","
plot '/dataset/iris/iris.csv' using 1:2
plot '/dataset/bodysize/bodysize.csv' using 1:2
plot sin(x)
plot cos(x)
plot tan(x)
plot 1/(1+exp(0.00213*x-0.00026))
plot 'data.csv'
plot 'data.csv', 1/(1+exp(0.00213*x-0.00026))
plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 
plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 1/(1+exp( 0.7527*x-22.7536 ))
plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
plot 'data.csv', 1/(1+exp(-0.00213*x+0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
plot 'data.csv', 1/(1+exp(-0.00213*x+0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
plot 'data.csv', 1/(1+exp(-0.18401*x+5.50508)), 1/(1+exp(- 0.7527*x+22.7536 ))
plot 'data.csv', 1/(1+exp(-0.18401*x+1095)), 1/(1+exp(- 0.7527*x+22.7536 ))
plot 'data.csv', 1/(1+exp(-35.77*x+1095)), 1/(1+exp(- 0.7527*x+22.7536 ))
exit
```
