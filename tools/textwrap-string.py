import textwrap



msg = """
Creates an EKS cluster with five managed nodes.
Kubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.
CloudWatch logging is not enabled.
SSH access is enabled for the cluster.
OIDC is enabled for the cluster.
eksctl-managed nodegroups are enabled for the cluster. A custom node type of c5.xlarge is used.
"""



print(repr("\n".join(textwrap.wrap(msg, width=60))))