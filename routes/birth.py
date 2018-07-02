import matplotlib as mpl
import matplotlib.pyplot as plt

import pandas as pd
import numpy as np 
import time
import sys
import json

X=pd.read_csv('lowbwtm11.csv')
X.dropna(axis = 0, how = 'any', inplace = True)
Y=X.BirthWt
X.drop('BirthWt', axis = 1, inplace = True)

#from sklearn.model_selection import train_test_split
#X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size = 0.3, random_state = 7)

from sklearn import linear_model, datasets

logreg = linear_model.LogisticRegression(C=1e5)

logreg.fit(X, Y)

#logreg.predict()

#score = logreg.score(X_test, y_test)
#print(score*100)

#lines = sys.stdin.readlines()

#Z = json.loads(lines[0])

#W = np.array(Z)
if(logreg.predict(X[0,:].reshape(1,-1))== 0):
	print("Greater than 2.5kg")
elif(logreg.predict(X[0,:].reshape(1,-1))== 1):
	print("Less than 2.5kg")