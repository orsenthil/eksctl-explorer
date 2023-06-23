import textwrap



msg = """CloudWatch logging for EKS control plane is not enabled by default due to data ingestion and storage costs.
To enable control plane logging when cluster is created, you will need to define cloudWatch.clusterLogging.enableTypes setting in your ClusterConfig.
"""


print(repr("\n".join(textwrap.wrap(msg, width=60))))