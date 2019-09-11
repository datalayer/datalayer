#!/usr/bin/env python

import nltk

#nltk.set_proxy('http://proxy.example.com:3128', ('USERNAME', 'PASSWORD'))
nltk.download()

from nltk.corpus import brown
brown.words()
