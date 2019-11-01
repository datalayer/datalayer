---
title: Kernel Magic
---

# Kernel Magic

+ https://ipython.readthedocs.io/en/stable/interactive/magics.html
+ https://ipython.readthedocs.io/en/stable/interactive/tutorial.html#magics-explained

+ https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts
+ https://towardsdatascience.com/jupyter-magics-with-sql-921370099589

```javascript
%%javascript

alert('adsf')
```

```bash
# Will print the Kernel ID information along with other details.
%connect_info
```

```bash
%load ...
# reload submodules.
%load_ext autoreload
%autoreload 2
```

```bash
%lsmagic

Available line magics:
%alias  %alias_magic  %autocall  %automagic  %autosave  %bookmark  %cat  %cd  %clear  %colors  %config  %connect_info  %cp  %debug  %dhist  %dirs  %doctest_mode  %ed  %edit  %env  %gui  %hist  %history  %killbgscripts  %ldir  %less  %lf  %lk  %ll  %load  %load_ext  %loadpy  %logoff  %logon  %logstart  %logstate  %logstop  %ls  %lsmagic  %lx  %macro  %magic  %man  %matplotlib  %mkdir  %more  %mv  %notebook  %page  %pastebin  %pdb  %pdef  %pdoc  %pfile  %pinfo  %pinfo2  %popd  %pprint  %precision  %profile  %prun  %psearch  %psource  %pushd  %pwd  %pycat  %pylab  %qtconsole  %quickref  %recall  %rehashx  %reload_ext  %rep  %rerun  %reset  %reset_selective  %rm  %rmdir  %run  %save  %sc  %set_env  %store  %sx  %system  %tb  %time  %timeit  %unalias  %unload_ext  %who  %who_ls  %whos  %xdel  %xmode

Available cell magics:%%!  %%HTML  %%SVG  %%bash  %%capture  %%debug  %%file  %%html  %%javascript  %%js  %%latex  %%perl  %%prun  %%pypy  %%python  %%python2  %%python3  %%ruby  %%script  %%sh  %%svg  %%sx  %%system  %%time  %%timeit  %%writefile

Automagic is ON, % prefix IS NOT needed for line magics.
```

```
%env
%run
%load
# invoke the truncation magic to see if truncation is on or off
%truncation
```

```python
import ipy_autoreload
%autoreload 2
%aimport your_mod
# %autoreload? for help
```
