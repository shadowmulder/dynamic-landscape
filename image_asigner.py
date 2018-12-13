import os
import sys
import json





with open('./database/data.json') as f:
    data = json.load(f)

found = 0
"""
for entry in data:
    query = entry['service']+".svg"
    absolutePath = "NaN"
    for root, dirs, files in os.walk('.\\img\logos\\'):
        for file in files:
            #print(file)
            if file == query:
                relativePath = os.path.join(root, file)
                found += 1
                entry['img'] = relativePath
                print(relativePath)

"""

for entry in data:
    query = (entry['service']+".svg").replace(" ","")
    absolutePath = "NaN"
    for root, dirs, files in os.walk('.\\img\logos\\AWS\\'):
        for file in files:
            if file.count('_') == 1:

                matchable = file.split('_', 1)[-1]

                if matchable == query:
                    relativePath = os.path.join(root, file)
                    found += 1
                    entry['img'] = relativePath
                    print(relativePath)


print(found)

with open('./database/data.json', 'w') as outfile:  
    json.dump(data, outfile, indent=4)






