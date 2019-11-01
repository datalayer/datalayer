#!/usr/bin/env python

# Licensed to the Datalayer Community (Datalayer) under one or more
# contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The Datalayer licenses this file
# to you under the Apache License, Version 2.0 (the 
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

from sklearn.datasets import make_classification
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.cross_validation import cross_val_score
import pandas as pd
import numpy as np

df = pd.read_csv('/dataset/lab/data.csv', sep=' ', header=None)
X = df[[1,2,3,4,5,6,7,8,9,10]].as_matrix()
y = df[[0]][0].tolist()

# Build a forest and compute the feature importances
forest = ExtraTreesClassifier(n_estimators=1000, 
                              n_jobs=2,
                              random_state=0)

forest.fit(X, y)

importances = forest.feature_importances_
std = np.std([tree.feature_importances_ for tree in forest.estimators_],
             axis=0)
indices = np.argsort(importances)[::-1]

# Print the feature ranking
print("Feature ranking:")
for f in range(10):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))

print cross_val_score(forest, X, y, cv=4, n_jobs=4)
