import json


with open('f1.yaml') as f:
    data = f.readlines()

print(repr("".join(data)))