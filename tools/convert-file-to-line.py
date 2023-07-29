import os

cluster_yaml = "/Users/senthilx/go/src/github.com/weaveworks/eksctl/examples/05-advanced-nodegroups.yaml"

with open(cluster_yaml) as f:
    data = f.readlines()

print(repr("".join(data)))
