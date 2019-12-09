#!/usr/bin/env python

import pandas as pd
import sys

raw_data = {'first_name': ['Jason', 'Molly', 'Tina', 'Jake', 'Amy'], 
        'last_name': ['Miller', 'Jacobson', 'Ali', 'Milner', 'Cooze'], 
        'age': [42, 52, 36, 24, 73], 
        'preTestScore': [4, 24, 31, 2, 3],
        'postTestScore': [25, 94, 57, 62, 70]}
df = pd.DataFrame(raw_data, columns = ['first_name', 'last_name', 'age', 'preTestScore', 'postTestScore'])
df

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
