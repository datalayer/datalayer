OUTPUTSHOT_DATALAYER_PLACEHOLDER_URL = 'http://diugs92wn0os.cloudfront.net/outputshot-datalayer-placeholder.png'


OUTPUTSHOT_NONE_PLACEHOLDER_URL = ''


INIT_TELL_SOURCE_SIMPLE = """i = 1
print('hello')
print(i)"""


INIT_TELL_SOURCE_IRIS = """from sklearn import datasets
import pandas as pd
iris = datasets.load_iris()
iris_df = pd.DataFrame(iris.data)
iris_df"""


INIT_TELL_SOURCE_MATPLOTLIB = """import matplotlib
import matplotlib.pyplot as plt
import numpy as np
t = np.arange(0.0, 2.0, 0.01)
s = 1 + np.sin(2 * np.pi * t)
fig, ax = plt.subplots()
ax.plot(t, s)
ax.set(xlabel='time (s)', ylabel='voltage (mV)', title='About as simple as it gets, folks')
ax.grid()
plt.show()"""
