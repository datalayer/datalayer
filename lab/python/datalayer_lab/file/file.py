f=open("guru99.txt","w+")
for i in range(10):
    f.write("This is line %d\r\n" % (i+1))
f.close()

f=open("guru99.txt", "a+")
for i in range(2):
     f.write("Appended line %d\r\n" % (i+1))
f.close()

f=open("guru99.txt", "r")
if f.mode == 'r':
    content=f.read()
f.close()
print(content)
