filename = raw_input("Filename : ")
mx = 0
with open(filename) as f :
    for line in f :
        line = line.split(' ')
        if line[0] == 'v' :
            for i in range(1,4) :
                mx = max(mx,abs(float(line[i])))


print mx
