import textwrap



msg = """
Amazon EKS supports IAM Roles for Service Accounts (IRSA) that allows cluster operators to map AWS IAM Roles to Kubernetes Service Accounts.
This provides fine-grained permission management for apps that run on EKS and use other AWS services. These could be apps that use S3, any other data services (RDS, MQ, STS, DynamoDB), or Kubernetes components like AWS Load Balancer controller or ExternalDNS.
This demonstrates how to use IRSA with a config file that attaches different policies to different service accounts.
"""

print(repr("\n".join(textwrap.wrap(msg, width=60))))