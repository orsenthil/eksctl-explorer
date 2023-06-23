import os

cluster_yaml = "/Users/senthilx/go/src/github.com/weaveworks/eksctl/examples/01-simple-cluster.yaml"

with open(cluster_yaml) as f:
    data = f.readlines()

print(repr("".join(data)))