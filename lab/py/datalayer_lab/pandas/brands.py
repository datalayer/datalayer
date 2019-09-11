#!/usr/bin/env python

import pandas as pd
import sys

store = 'tweets.csv'

df = pd.read_csv(store, sep=';',names=['brand','id','username','date','tweet','source'])

brand1 = df[df.brand == 'SNCB']
brand2 = df[df.brand == 'SNCF']

from pattern.fr import parse, sentiment, ngrams, pprint
from pattern.web import URL, plaintext
from pattern.metrics import readability

b1_read = 0.0
b1_sent = 0.0
for tweet in brand1.tweet:
    b1_sent += sentiment(plaintext(tweet))[0]
    b1_read += readability(tweet)
    
b2_read = 0.0
b2_sent = 0.0
for tweet in brand2.tweet:
    b2_sent += sentiment(plaintext(tweet))[0]
    b2_read += readability(tweet)    

print 'SNCB: %f' % b1_sent
print 'SNCF: %f' % b2_sent