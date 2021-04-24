---
title: Kernel Magic
---

# Kernel Magic

- https://ipython.readthedocs.io/en/stable/interactive/magics.html
- https://ipython.readthedocs.io/en/stable/interactive/tutorial.html#magics-explained

- https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts
- https://towardsdatascience.com/jupyter-magics-with-sql-921370099589

## Start

```bash
# or ipython
jupyter console
jupyter qtconsole
```

## Bash

```bash
!ls
!pwd
!hostname
```

## Magics

```
%lsmagic

Available line magics:

%alias  %alias_magic  %autocall  %automagic  %autosave  %bookmark  %cat  %cd  %clear  %colors  %config  %connect_info  %cp  %debug  %dhist  %dirs  %doctest_mode  %ed  %edit  %env  %gui  %hist  %history  %killbgscripts  %ldir  %less  %lf  %lk  %ll  %load  %load_ext  %loadpy  %logoff  %logon  %logstart  %logstate  %logstop  %ls  %lsmagic  %lx  %macro  %magic  %man  %matplotlib  %mkdir  %more  %mv  %notebook  %page  %pastebin  %pdb  %pdef  %pdoc  %pfile  %pinfo  %pinfo2  %popd  %pprint  %precision  %profile  %prun  %psearch  %psource  %pushd  %pwd  %pycat  %pylab  %qtconsole  %quickref  %recall  %rehashx  %reload_ext  %rep  %rerun  %reset  %reset_selective  %rm  %rmdir  %run  %save  %sc  %set_env  %store  %sx  %system  %tb  %time  %timeit  %unalias  %unload_ext  %who  %who_ls  %whos  %xdel  %xmode

Available cell magics:

%%!  %%HTML  %%SVG  %%bash  %%capture  %%debug  %%file  %%html  %%javascript  %%js  %%latex  %%perl  %%prun  %%pypy  %%python  %%python2  %%python3  %%ruby  %%script  %%sh  %%svg  %%sx  %%system  %%time  %%timeit  %%writefile

Automagic is ON, % prefix IS NOT needed for line magics.

%autosave 0
```

## Line Magics

```bash
# Will print the Kernel ID information along with other details.
# With automagic ON
connect_info
# With automagic OFF
%connect_info
```

```bash
%env
%run
%load?
%load ...
# invoke the truncation magic to see if truncation is on or off
%truncation
```

```python
# Introduction and overview of IPython’s features.
?
# Quick reference.
%quickref
# Python’s own help system.
help
# Details about object, use object?for extra details.
object?
# Tab completion, especially for attributes, is a convenient way to explore the structure of any object you’re dealing with.
# Simply type object_name.<TAB>to view the object’s attributes.
# Besides Python objects and keywords, tab completion also works on file and directory names.
TAB Completion
# has special flags for timing the execution of yourscripts (-t), or for running them under the control of either Python’s pdb debugger (-d) or profiler (-p).
%run
# Gives a reasonable approximation of multiline editing, by invoking your favorite editor on the spot.
# IPython will execute the code you type in there as if it were typed interactively.
%edit
#
%history
```

```python
# Functions that work with code.
%run
%edit
%save
%macro
%recal
# Functions which affect the shell.
%colors
%xmode
%autoindent
%automagic
# Other functions.
%reset
%timeit
%writefile
%load
%paste
```

```python
%time 2**128
!ping www.google.com
# Capture
files=!ls /tmp
files
# Passing vars
!grep -rF $patern ipython/*
```

## Modules

```python
# reload submodules.
# import ipy_autoreload
%aimport your_mod
%load_ext autoreload
%autoreload?
%autoreload 2
```

## Cell Magics

```javascript
// In JupyterLab
%%javascript
alert('adsf')
```
