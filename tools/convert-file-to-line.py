import os


with open("/Users/senthilx/cluster.yaml") as f:
    data = f.readlines()

print(repr("".join(data)))