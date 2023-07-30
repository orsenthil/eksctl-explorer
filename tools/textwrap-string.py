import textwrap



msg = """
An example ClusterConfig that creates a fully-private cluster on AWS Outposts.
Since the VPC will be created by eksctl, it will lack connectivity to the API server because eksctl does not
associate the VPC with the local gateway. Therefore, the command must be run with `--without-nodegroup`, as in
`eksctl create cluster -f examples/37-outposts.yaml --without-nodegroup`, and the nodegroups can be created after
ensuring connectivity to the API server.
"""

print(repr("\n".join(textwrap.wrap(msg, width=60))))