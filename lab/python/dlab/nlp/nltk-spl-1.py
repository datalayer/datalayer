#!/usr/bin/env python

import nltk

# Tokenize and tag some text
sentence = """At eight o'clock on Thursday morning
Arthur didn't feel very good."""

tokens = nltk.word_tokenize(sentence)
tagged = nltk.pos_tag(tokens)

# Identify named entities
entities = nltk.chunk.ne_chunk(tagged)

# Display a parse tree

from nltk.corpus import treebank
t = treebank.parsed_sents('wsj_0001.mrg')[0]
t.draw()
