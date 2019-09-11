#fizz buzz v2 
#Unit 1 Lesson 4 Project
import sys

#Check for user provided limit on command line
try:
	limit = sys.argv[1]
except:
	limit = ''

#loop until valid input received
while not isinstance(limit,int):
	try:
		limit = int(limit)
	except:
		limit = raw_input("Enter a whole number to count up to: ")

print "Fizz buzz counting up to {lim}".format(lim=limit)

for i in xrange(1,limit+1):
	fizzbuzz = False
	if i % 3 == 0:
		print "fizz",
		fizzbuzz = True
	if i % 5 == 0:
		print "buzz",
		fizzbuzz = True
	if not fizzbuzz:
		print str(i),
	print #get a new line
