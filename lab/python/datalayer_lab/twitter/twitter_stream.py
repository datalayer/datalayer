#!/usr/bin/env python

from pattern.web import Twitter
import time
import sys

keyword = 'datalayer'

your_license = None
# your_license = ('key', 'secret', ('token','token_secret'))

if len(sys.argv) > 1:
	keyword = sys.argv[1]

# It might take a few seconds to set up the stream.
stream = Twitter(license=your_license, language="en").stream(keyword, timeout=30)

#while True:
for i in range(100):
    # print i
    # Poll Twitter to see if there are new tweets.
    stream.update()
    # The stream is a list of buffered tweets so far,
    # with the latest tweet at the end of the list.
    for tweet in reversed(stream):
        print tweet.text
        print tweet.language
    # Clear the buffer every so often.
    stream.clear()
    # Wait awhile between polls.
    time.sleep(1)
