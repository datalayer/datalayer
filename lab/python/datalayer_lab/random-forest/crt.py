#!/usr/bin/env python

from sklearn import preprocessing
from sklearn import linear_model
from sklearn import cross_validation
from sklearn.metrics import log_loss, roc_auc_score
from scipy.sparse import hstack
import pandas as pd
import numpy as np

print("Loading data")
data = pd.read_csv("dataset/train.csv", low_memory=False)
data = data.drop(['id', 'hour', 'device_ip'],1)

split = int(0.6*len(data))
dataTest = data.drop(range(0,split))
dataTrain = data.drop(range(split, len(data)))

df_train = []
df_test = []

cut = 50
print("Removing small categories")

for c in data.columns:
    if c == 'click':
        continue
    counts = data[c].value_counts(sort=False)
    dataClean = data[c]

    counts = counts[counts > cut]
    dataClean = dataClean[dataClean.isin(counts.keys())]
        
    if (len(dataClean) == 0):
        continue
    lb = preprocessing.LabelBinarizer(sparse_output=True)
    fit = lb.fit(dataClean)
    im = lb.transform(data[c])
    im = lb.transform(dataTrain[c])
    df_train.append(im)
    im = lb.transform(dataTest[c])
    df_test.append(im)

endDataTrain = hstack(df_train)
endDataTest = hstack(df_test)

print("Train model...")
clf = linear_model.Lasso()
clf.fit(endDataTrain,dataTrain['click'])
pred = clf.predict(endDataTest)

print("Logloss:")
print(log_loss(dataTest['click'], pred))
