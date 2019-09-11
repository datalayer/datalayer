#!/usr/bin/env python

import pickle
from sklearn import datasets
from sklearn import svm
from sklearn.externals import joblib

iris = datasets.load_iris()
digits = datasets.load_digits()
print(digits.data)

digits.target
digits.images[0]

clf = svm.SVC(gamma=0.001, C=100.)

clf.fit(digits.data[:-1], digits.target[:-1])  
clf.predict(digits.data[-1])

clf = svm.SVC()
iris = datasets.load_iris()
X, y = iris.data, iris.target
clf.fit(X, y)

svm.SVC(C=1.0, cache_size=200, class_weight=None, coef0=0.0, degree=3, gamma=0.25,
  kernel='rbf', probability=False, shrinking=True, tol=0.001,
  verbose=False)

s = pickle.dumps(clf)
clf2 = pickle.loads(s)
clf2.predict(X[0])

joblib.dump(clf, 'filename.pkl')

clf = joblib.load('filename.pkl') 
