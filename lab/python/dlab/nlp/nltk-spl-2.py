#!/usr/bin/env python

import codecs
import dateutil.parser
import multiprocessing
import nltk

porter = nltk.PorterStemmer()
minLength = 3

def readTweets(fileName):
	'''
	Read in the tweet data.  This is just tab-delimited.
	'''
	rows = [[field.strip() for field in line.split("\t")] for line in codecs.open(fileName, 'r', 'utf-8')]
  return [(row[0]) for row in rows]
//  return [(int(row[0]), dateutil.parser.parse(row[1]), row[2], row[3]) for row in rows]

def processDoc(doc):
	'''
	Pre-process each document and return an nltk.Text object.
	This is just a stub so we can call map().
	'''
	return nltk.Text([porter.stem(w.lower()) for w in nltk.word_tokenize(doc) if len(w) >= minLength])
	

def main():
	'''
	Main
	'''
	pool = multiprocessing.Pool(8)
	docs = [tweet[3] for tweet in readTweets("/dataset/tweets/tweets-20140923.txt")]
	corpus = pool.map(processDoc, docs)
	print corpus[0]
	
if __name__ == "__main__":
	main()
