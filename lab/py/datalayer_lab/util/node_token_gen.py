#!/usr/bin/env python

num_node = 4

for n in range(num_node):
    print str(n) + ': ' + str(int(2**127 / num_node * n))
