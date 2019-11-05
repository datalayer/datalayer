#!/usr/bin/env python

from pattern.web import Twitter
import codecs
import time
import os.path
import sys

store = 'tweets.csv'

def loadbrands(fn='brands.csv'):
  brands = []
  f = open(fn)
  for l in f:
    brands.append(l.strip())
  return brands

def loadseen(fn):
  seen = {}
  if not os.path.isfile(fn):
    return seen
  f = open(fn)
  for l in f:
    t = l.strip().split(';')
    seen[ t[1] ] = 1
  return seen


your_license = None
#your_license = ('key', 'secret', ('token','token_secret'))

seen = loadseen(store)
brands = loadbrands()

f = codecs.open(store,'a','utf-8')

twitter = Twitter(license=your_license, language='fr')
for i in range(10):
    for brand in brands:
        print '--'*10 + ' ' + brand
        for tweet in twitter.search(brand, cached=False, count=250):
            txt = tweet.txt.strip().replace('\n',' ').replace(';',' ').replace('"',' ')
            if tweet.id not in seen:
                f.write(';'.join([brand,tweet.id,tweet.author,tweet.date,'"'+txt+'"','twitter']) + '\n')
                seen[tweet.id] = 1                
    time.sleep(60)

f.close()
