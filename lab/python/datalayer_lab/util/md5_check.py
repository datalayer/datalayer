#!/usr/bin/env python

from os.path import join, splitext, basename

import os
import sys
import hashlib

def file_get_contents(path):
	with open(path, 'rb') as file:
		return file.read()

for root, dirs, files in os.walk('.'):
	for file in files:
		file = join(root, file)

name, ext = splitext(file)

if ext == '.md5':
	file_contents = file_get_contents(name)

md5_given = file_get_contents(file)

md5_actual = hashlib.md5(file_contents).hexdigest()

if (md5_given == md5_actual):
	print "%s md5 OK" % basename(name)
else:
	print "\nERROR: md5 mismatch\nfile : %s\ncalculated: %s\ngiven : %s\n" % (name, md5_actual, md5_given)

if ext == '.sha1':
	file_contents = file_get_contents(name)

sha1_given = file_get_contents(file)

sha1_actual = hashlib.sha1(file_contents).hexdigest()

if (sha1_given == sha1_actual):
	print "%s sha1 OK" % basename(name)
else:
	print "\nERROR: sha1 mismatch\nfile : %s\ncalculated: %s\ngiven : %s\n" % (name, sha1_actual, sha1_given)
