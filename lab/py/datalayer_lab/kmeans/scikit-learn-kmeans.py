#!/usr/bin/env python

from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1, 2], [1, 4], [1, 0], [4, 2], [4, 4], [4, 0]])

kmeans = KMeans(n_clusters=2, random_state=0).fit(X)
kmeans.labels_

kmeans.predict([[0, 0], [4, 4]])
print(kmeans.cluster_centers_)

print("-------------")
# You will get matrix of cluster and feature_weights, from that you can conclude, the feature having more weight takes major part to contribute cluster
res=kmeans.__dict__
print(res)
print(res['cluster_centers_'])
