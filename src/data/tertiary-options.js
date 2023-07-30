export const tertiaryOptions = {
    'install-eksctl': [
        {
            value: 'install-eksctl-linux',
            label: 'On linux',
            usage: 'curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp\nsudo mv /tmp/eksctl /usr/local/bin',
            nb: 'This will download the latest release of eksctl and install it in /usr/local/bin.',
        },
        {
            value: 'install-eksctl-macos',
            label: 'On macOS',
            usage: 'brew tap weaveworks/tap\nbrew install weaveworks/tap/eksctl',
            nb: 'This will download the latest release of eksctl using brew and install it in /usr/local/bin.',
        },
        {
            value: 'install-eksctl-windows',
            label: 'On Windows',
            usage: 'choco install eksctl',
            nb: 'This will download the latest release of eksctl using choco and install it in C:\\ProgramData\\chocolatey\\bin.',
        },
        {
            value: 'install-eksctl-from-source',
            label: 'From source',
            usage: 'git clone https://github.com/weaveworks/eksctl.git\ncd eksctl\nmake install-build-deps\nmake build',
            nb: 'This will clone the latest source of eksctl and create a binary ./eksctl in the current directory.\nYou need to have a working go environment.',
        },
    ],
    'default-cluster': [
        {
            value: 'default-cluster-option',
            label: 'with default options.',
            usage: 'eksctl create cluster',
            nb: 'Creates an EKS cluster with two managed nodes.'
        },
        {
            value: 'default-cluster-with-config-file',
            label: 'with config file',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Creates an EKS cluster with two managed node groups.',
            filecontent: 'apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: basic-cluster\n  region: eu-north-1\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 3\n  - name: ng-2\n    instanceType: m5.xlarge\n    desiredCapacity: 2'
        },
        {
            value: 'default-cluster-config-volumes',
            label: 'config allow ssh access, and volumes',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Creates an EKS cluster with two managed node groups.',
            filecontent: 'apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: basic-cluster\n  region: eu-north-1\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 10\n    volumeSize: 80\n    ssh:\n      allow: true # will use ~/.ssh/id_rsa.pub as the default ssh key\n  - name: ng-2\n    instanceType: m5.xlarge\n    desiredCapacity: 2\n    volumeSize: 100\n    ssh:\n      publicKeyPath: ~/.ssh/ec2_id_rsa.pub'

        },
        {
            value: 'cluster-existing-vpc',
            label: 'Config file with existing VPC',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Creates an EKS cluster with existing VPC',
            filecontent: 'apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-in-existing-vpc\n  region: eu-north-1\n\nvpc:\n  subnets:\n    private:\n      eu-north-1a: { id: subnet-0ff156e0c4a6d300c }\n      eu-north-1b: { id: subnet-0549cdab573695c03 }\n      eu-north-1c: { id: subnet-0426fb4a607393184 }\n\nnodeGroups:\n  - name: ng-1-workers\n    labels: { role: workers }\n    instanceType: m5.xlarge\n    desiredCapacity: 3\n    privateNetworking: true\n  - name: ng-2-builders\n    labels: { role: builders }\n    instanceType: m5.2xlarge\n    desiredCapacity: 2\n    privateNetworking: true\n    iam:\n      withAddonPolicies:\n        imageBuilder: true'
        },
        {
            value: 'default-cluster-dry-run',
            label: 'as a dry run',
            usage: 'eksctl create cluster --dry-run',
            nb: 'Prints eksctl cluster manifest yaml to stdout \nwithout creating the cluster.'
        },
        {
            value: 'default-cluster-with-ssh',
            label: 'with ssh access',
            usage: 'eksctl create cluster --ssh-access',
            nb: 'Creates an EKS cluster with two managed nodes.\n\nKubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.\n\nCloudWatch logging is not enabled.\n\nSSH access is enabled for the cluster.'
        },
        {
            value: 'default-cluster-with-5-nodes-ssh-access-and-oidc',
            label: 'with 5 nodes, ssh access and oidc.',
            usage: 'eksctl create cluster --nodes 5 --ssh-access --with-oidc',
            nb: 'Creates an EKS cluster with five managed nodes.\n\nKubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.\n\nCloudWatch logging is not enabled.\n\nSSH access is enabled for the cluster.\n\nOIDC is enabled for the cluster.'
        },
        {
            value: 'default-cluster-with-5-nodes-ssh-access-and-oidc-and-eksctl-managed-nodegroups',
            label: 'customized 5 node cluster',
            usage: 'eksctl create cluster --name $USER-$(date +%d%b) --version 1.27 --region us-west-2 --with-oidc --ssh-access --nodegroup-name standard-workers --node-type c5.xlarge --nodes 5 --nodes-min 1 --nodes-max 5 --auto-kubeconfig',
            nb: ' Creates an EKS cluster with five managed nodes. Kubernetes\nAPI endpoint access will use default of {publicAccess=true,\nprivateAccess=false} for cluster. CloudWatch logging is not\nenabled. SSH access is enabled for the cluster. OIDC is\nenabled for the cluster. eksctl-managed nodegroups are\nenabled for the cluster. A custom node type of c5.xlarge is\nused.'
        },
        {
            value: 'custom-windows-cluster-option',
            label: 'windows cluster using a config.',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'creates a cluster using a config file.',
            filecontent: '# cluster.yaml\n# An example of ClusterConfig containing Windows and Linux node groups to support Windows workloads\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\nmetadata:\n  name: floral-unicorn-1686245635\n  region: us-west-2\n  version: "1.27"\nnodeGroups:\n  - name: windows-ng\n    amiFamily: WindowsServer2019FullContainer\n    minSize: 2\n    maxSize: 3\nmanagedNodeGroups:\n  - name: linux-ng\n    instanceType: t2.large\n    minSize: 2\n    maxSize: 3\n  - name: windows-managed-ng\n    amiFamily: WindowsServer2019FullContainer\n    minSize: 2\n    maxSize: 3\n',
        },
        {
            value: 'custom-kubelet-configuration',
            label: 'custom kubelet configuration',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'The values specified in the config file for the the fields\nin kubeletExtraconfig will completely overwrite the default\nvalues specified by eksctl. Config files can include the\nkubeletExtraConfig field which accepts a free form yaml that\nwill be embedded into the kubelet.yaml.',
            filecontent: 'apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: dev-cluster-1\n  region: eu-north-1\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5a.xlarge\n    desiredCapacity: 1\n    kubeletExtraConfig:\n      kubeReserved:\n        cpu: "300m"\n        memory: "300Mi"\n        ephemeral-storage: "1Gi"\n      kubeReservedCgroup: "/kube-reserved"\n      systemReserved:\n        cpu: "300m"\n        memory: "300Mi"\n        ephemeral-storage: "1Gi"\n      evictionHard:\n        memory.available:  "200Mi"\n        nodefs.available: "10%"\n      featureGates:\n        RotateKubeletServerCertificate: true # has to be enabled, otherwise it will be disabled'
        },
        {
            value: 'custom-cluster-with-iam-serviceaccounts',
            label: 'custom cluster with iam serviceaccounts',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Amazon EKS supports IAM Roles for Service Accounts (IRSA)\nthat allows cluster operators to map AWS IAM Roles to\nKubernetes Service Accounts. This provides fine-grained\npermission management for apps that run on EKS and use other\nAWS services. These could be apps that use S3, any other\ndata services (RDS, MQ, STS, DynamoDB), or Kubernetes\ncomponents like AWS Load Balancer controller or ExternalDNS.\nThis demonstrates how to use IRSA with a config file that\nattaches different policies to different service accounts.',
            filecontent: '# An example of ClusterConfig with IAMServiceAccounts:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-13\n  region: us-west-2\n\niam:\n  withOIDC: true\n  serviceAccounts:\n  - metadata:\n      name: s3-reader\n      # if no namespace is set, "default" will be used;\n      # the namespace will be created if it doesn\'t exist already\n      namespace: backend-apps\n      labels: {aws-usage: "application"}\n    attachPolicyARNs:\n    - "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"\n    tags:\n      Owner: "John Doe"\n      Team: "Some Team"\n  - metadata:\n      name: cache-access\n      namespace: backend-apps\n      labels: {aws-usage: "application"}\n    attachPolicyARNs:\n    - "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"\n    - "arn:aws:iam::aws:policy/AmazonElastiCacheFullAccess"\n  - metadata:\n      name: cluster-autoscaler\n      namespace: kube-system\n      labels: {aws-usage: "cluster-ops"}\n    wellKnownPolicies:\n      autoScaler: true\n    roleName: eksctl-cluster-autoscaler-role\n    roleOnly: true\nnodeGroups:\n  - name: "ng-1"\n    tags:\n      # EC2 tags required for cluster-autoscaler auto-discovery\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-13: "owned"\n    desiredCapacity: 1\n'
        },
        {
            value: 'custom-cluster-with-cloudwatch-logging',
            label: 'custom cluster with cloudwatch logging',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'CloudWatch logging for EKS control plane is not enabled by\ndefault due to data ingestion and storage costs. To enable\ncontrol plane logging when cluster is created, you will need\nto define cloudWatch.clusterLogging.enableTypes setting in\nyour ClusterConfig.',
            filecontent: '# A simple example of ClusterConfig object:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-1\n  region: eu-north-1\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\ncloudWatch:\n    clusterLogging:\n        # enable specific types of cluster control plane logs\n        enableTypes: ["audit", "authenticator", "controllerManager"]\n        # all supported types: "api", "audit", "authenticator", "controllerManager", "scheduler"\n        # supported special values: "*" and "all"\n'
        },
        {
            value: 'custom-cluster-with-vpc-cidr-auto-ipv6-no-nodes',
            label: 'custom cluster with vpc cidr auto ipv6 no nodes',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Custom VPC IPv4 CIDR, and auto-allocated IPv6 CIDRs for all subnets; also without any node groups',
            filecontent: '# An example of ClusterConfig object with custom VPC IPv4 CIDR,\n# and auto-allocated IPv6 CIDRs for all subnets; also without\n# any nodegroups:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-2\n  region: us-west-2\n\nvpc:\n  cidr: 10.10.0.0/16\n  autoAllocateIPv6: true\n  hostnameType: resource-name\n  # disable public access to endpoint and only allow private access\n  clusterEndpoints:\n    publicAccess: false\n    privateAccess: true\n\nnodeGroups: []\n'
        },
        {
            value: 'custom-cluster-customized-node-group',
            label: 'custom cluster customized node group',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Customized node groups with pre bootstrap commands',
            filecontent: '# An advanced example of ClusterConfig object with customised nodegroups:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-5\n  region: eu-west-2\n\nnodeGroups:\n  - name: ng1-public\n    instanceType: m5.xlarge\n    minSize: 2\n    maxSize: 8\n    volumeSize: 100\n    volumeType: gp2\n    ami: ami-05ecac759c81e0b0c\n    amiFamily: AmazonLinux2\n    # defaults to true, which enforces the use of IMDSv2 tokens\n    disableIMDSv1: false\n    labels:\n      nodegroup-type: frontend-workloads\n    iam:\n      withAddonPolicies:\n        autoScaler: true\n\n  - name: ng2-private-a\n    instanceType: m5.large\n    desiredCapacity: 2\n    labels:\n      nodegroup-type: backend-cluster-addons\n    targetGroupARNs:\n      - arn:aws:elasticloadbalancing:eu-west-2:01234567890:targetgroup/target-group-1/abcdef0123456789\n    privateNetworking: true\n    preBootstrapCommands:\n      # allow docker registries to be deployed as cluster service\n      - "sed \'2i \\"insecure-registries\\": [\\"172.20.0.0/16\\",\\"10.100.0.0/16\\"],\'  /etc/docker/daemon.json"\n      - "systemctl restart docker"\n\n  - name: ng3-private-b\n    instanceType: c3.8xlarge\n    desiredCapacity: 4\n    labels:\n      nodegroup-type: very-special-science-workloads\n    classicLoadBalancerNames:\n      - ng3-classic-load-balancer\n    asgMetricsCollection:\n      - granularity: 1Minute\n        metrics:\n          - GroupMinSize\n          - GroupMaxSize\n          - GroupDesiredCapacity\n          - GroupInServiceInstances\n          - GroupPendingInstances\n          - GroupStandbyInstances\n          - GroupTerminatingInstances\n          - GroupTotalInstances\n    taints:\n      - key: special\n        value: "true"\n        effect: NoSchedule\n    privateNetworking: true\n    availabilityZones: ["eu-west-2a"] # use single AZ to optimise data transfer between instances\n\n# cluster AZs must be set explicitly for single AZ nodegroup example to work\navailabilityZones: ["eu-west-2a", "eu-west-2b", "eu-west-2c"]\n'
        },
        {
            value: 'custom-cluster-csi-drivers',
            label: 'custom cluster csi drivers',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Create a cluster with access to CSI drivers',
            filecontent: '# An example of ClusterConfig object with access to CSI drivers:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-6\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    iam:\n      withAddonPolicies:\n        ebs: true\n        fsx: true\n        efs: true\n'
        },
        {
            value: 'custom-cluster-with-node-group-ssh-keys',
            label: 'custom cluster with node group ssh keys',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing different ways of setting nodegroup SSH keys',
            filecontent: '# An example of ClusterConfig showing different ways of setting nodegroup SSH keys:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-7\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh: # import public key from file\n      publicKeyPath: ~/.ssh/id_rsa_tests.pub\n  - name: ng-2\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh: # import default public key (~/.ssh/id_rsa.pub)\n      allow: true\n  - name: ng-3\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh: # use existing EC2 key\n      publicKeyName: ec2_dev_key\n  - name: ng-4\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh: # import inline public key\n      publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDqZEdzvHnK/GVP8nLngRHu/GDi/3PeES7+Bx6l3koXn/Oi/UmM9/jcW5XGziZ/oe1cPJ777eZV7muEvXg5ZMQBrYxUtYCdvd8Rt6DIoSqDLsIPqbuuNlQoBHq/PU2IjpWnp/wrJQXMk94IIrGjY8QHfCnpuMENCucVaifgAhwyeyuO5KiqUmD8E0RmcsotHKBV9X8H5eqLXd8zMQaPl+Ub7j5PG+9KftQu0F/QhdFvpSLsHaxvBzA5nhIltjkaFcwGQnD1rpCM3+UnQE7Izoa5Yt1xoUWRwnF+L2TKovW7+bYQ1kxsuuiX149jXTCJDVjkYCqi7HkrXYqcC1sbsror someuser@hostname"\n  - name: ng-5\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh: # use existing EC2 key but don\'t allow SSH access to nodegroup (security group is not created to allow SSH access).\n      publicKeyName: ec2_dev_key\n      allow: false\n  - name: ng-6\n    instanceType: m5.large\n    desiredCapacity: 1\n    ssh:\n      enableSsm: true\n  - name: ng-7\n    instanceType: m5.large\n    desiredCapacity: 1\n    # no SSH\n'
        },
        {
            value: 'custom-cluster-with-mixed-instances',
            label: 'custom cluster with mixed instances',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing nodegroups with mixed instances (spot and on demand)',
            filecontent: '# An example of ClusterConfig showing nodegroups with mixed instances (spot and on demand):\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n    name: cluster-8\n    region: us-west-2\n\nnodeGroups:\n    - name: ng-1\n      minSize: 2\n      maxSize: 5\n      instancesDistribution:\n        maxPrice: 0.017\n        instanceTypes: ["t3.small", "t3.medium"] # At least one instance type should be specified\n        onDemandBaseCapacity: 0\n        onDemandPercentageAboveBaseCapacity: 50\n        spotInstancePools: 2\n\n'
        },
        {
            value: 'custom-cluster-with-highly-available-nat-gateways',
            label: 'custom cluster with highly available nat gateways',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing highly available NAT gateways',
            filecontent: "# An example of ClusterConfig object with highly available NAT gateways\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-9\n  region: us-west-2\n\nvpc:\n  nat:\n    gateway: HighlyAvailable # other options: Disable, Single (default)\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.xlarge\n    desiredCapacity: 2\n    privateNetworking: true # if only 'Private' subnets are given, this must be enabled\n"
        },
        {
            value: 'custom-cluster-with-encrypted-volumes',
            label: 'custom cluster with encrypted volumes',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing encrypted volumes',
            filecontent: '# An example of encrypting worker root volumes\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-10\n  region: us-west-2\n\nnodeGroups:\n  - name: ng1-encrypt-using-default-kms-key\n    instanceType: m5.xlarge\n    desiredCapacity: 1\n    volumeSize: 100\n    volumeType: gp2\n    volumeEncrypted: true\n\n  - name: ng2-encrypt-using-customer-encryption-key\n    instanceType: m5.xlarge\n    desiredCapacity: 1\n    volumeSize: 100\n    volumeType: gp2\n    volumeEncrypted: true\n    volumeKmsKeyID: 36c0b54e-64ed-4f2d-a1c7-96558764311e # please see https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html for service-linked role permissions\n'
        },
        {
            value: 'custom-cluster-with-cloudwatch-logging',
            label: 'custom cluster with cloudwatch logging',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing cloudwatch logging',
            filecontent: '# An example of ClusterConfig object that has CloudWatch cluster logging enable:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-11\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\ncloudWatch:\n  clusterLogging:\n    # enable specific types of cluster control plane logs\n    enableTypes: ["audit", "authenticator", "controllerManager"]\n    # all supported types: "api", "audit", "authenticator", "controllerManager", "scheduler"\n    # supported special values: "*" and "all"\n\n    # Sets the number of days to retain the logs for (see [CloudWatch docs](https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutRetentionPolicy.html#API_PutRetentionPolicy_RequestSyntax)).\n    # By default, log data is stored in CloudWatch Logs indefinitely.\n    logRetentionInDays: 60\n'
        },
        {
            value: 'custom-cluster-with-gitops-flux-v2',
            label: 'custom cluster with gitops flux v2',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing gitops flux v2',
            filecontent: '# An example of ClusterConfig object enabling gitops Flux v2\n# in a cluster:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-12\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\ngitops:\n  flux:\n    gitProvider: github             # required. options are github or gitlab\n    flags:                          # required. arbitrary map[string]string for all flux args.\n    # these args are not controlled by eksctl. see https://fluxcd.io/docs/get-started/ for all available flags\n      owner: "dr-who"\n      repository: "our-org-gitops-repo"\n      private: "true"\n      branch: "main"\n      namespace: "flux-system"\n      path: "clusters/cluster-12"\n      team: "team1,team2"\n'
        },
        {
            value: 'custom-cluster-with-iam-service-accounts',
            label: 'custom cluster with iam service accounts',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing iam service accounts',
            filecontent: '# An example of ClusterConfig with IAMServiceAccounts:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-13\n  region: us-west-2\n\niam:\n  withOIDC: true\n  serviceAccounts:\n  - metadata:\n      name: s3-reader\n      # if no namespace is set, "default" will be used;\n      # the namespace will be created if it doesn\'t exist already\n      namespace: backend-apps\n      labels: {aws-usage: "application"}\n    attachPolicyARNs:\n    - "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"\n  - metadata:\n      name: aws-load-balancer-controller\n      namespace: kube-system\n    wellKnownPolicies:\n      awsLoadBalancerController: true\n  - metadata:\n      name: ebs-csi-controller-sa\n      namespace: kube-system\n    wellKnownPolicies:\n      ebsCSIController: true\n  - metadata:\n      name: efs-csi-controller-sa\n      namespace: kube-system\n    wellKnownPolicies:\n      efsCSIController: true\n  - metadata:\n      name: external-dns\n      namespace: kube-system\n    wellKnownPolicies:\n      externalDNS: true\n  - metadata:\n      name: cert-manager\n      namespace: cert-manager\n    wellKnownPolicies:\n      certManager: true\n  - metadata:\n      name: cluster-autoscaler\n      namespace: kube-system\n      labels: {aws-usage: "cluster-ops"}\n    wellKnownPolicies:\n      autoScaler: true\n  - metadata:\n      name: build-service\n      namespace: ci-cd\n    wellKnownPolicies:\n      imageBuilder: true\n  - metadata:\n      name: cache-access\n      namespace: backend-apps\n      labels: {aws-usage: "application"}\n    attachPolicyARNs:\n    - "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"\n    - "arn:aws:iam::aws:policy/AmazonElastiCacheFullAccess"\n  - metadata:\n      name: autoscaler-service\n      namespace: kube-system\n    attachPolicy: # inline policy can be defined along with `attachPolicyARNs`\n      Version: "2012-10-17"\n      Statement:\n      - Effect: Allow\n        Action:\n        - "autoscaling:DescribeAutoScalingGroups"\n        - "autoscaling:DescribeAutoScalingInstances"\n        - "autoscaling:DescribeLaunchConfigurations"\n        - "autoscaling:DescribeTags"\n        - "autoscaling:SetDesiredCapacity"\n        - "autoscaling:TerminateInstanceInAutoScalingGroup"\n        - "ec2:DescribeLaunchTemplateVersions"\n        Resource: \'*\'\n  - metadata:\n      name: some-app\n      namespace: default\n    attachRoleARN: arn:aws:iam::123:role/already-created-role-for-app\n\nnodeGroups:\n  - name: "ng-1"\n    tags:\n      # EC2 tags required for cluster-autoscaler auto-discovery\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-13: "owned"\n    desiredCapacity: 1\n'

        },
        {
            value: 'custom-cluster-with-windows-and-linux-node-groups',
            label: 'custom cluster with windows and linux node groups to support windows workloads',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing windows and linux node groups to support windows workloads',
            filecontent: '# An example of ClusterConfig containing Windows and Linux node groups to support Windows workloads\n# This example should be run with `eksctl create cluster -f 14-windows-nodes.yaml`\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-14\n  region: us-west-2\n\nnodeGroups:\n  - name: windows-ng\n    amiFamily: WindowsServer2019FullContainer\n    minSize: 2\n    maxSize: 3\n\nmanagedNodeGroups:\n  - name: linux-ng\n    instanceType: t2.large\n    minSize: 2\n    maxSize: 3\n'
        },
        {
            value: 'custom-cluster-with-managed-node-groups',
            label: 'custom cluster with managed node groups',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing managed node groups',
            filecontent: `# An example of ClusterConfig object using Managed Nodes\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-15\n  region: us-west-2\n\nmanagedNodeGroups:\n  - name: managed-ng-public\n    instanceType: m5.large\n    minSize: 2\n    desiredCapacity: 3\n    maxSize: 4\n    availabilityZones: ["us-west-2a", "us-west-2b"]\n    volumeSize: 20\n    updateConfig:\n      maxUnavailable: 3 # or maxUnavailablePercentage: 75 to specify maxUnavailable as a percentage of total nodes\n    securityGroups:\n      attachIDs: ["sg-1", "sg-2"]\n    ssh:\n      allow: true\n      publicKeyPath: ~/.ssh/ec2_id_rsa.pub\n      # new feature for restricting SSH access to certain AWS security group IDs\n      sourceSecurityGroupIds: ["sg-00241fbb12c607007"]\n    labels: {role: worker}\n    # Note: unmanaged nodegroups (nodeGroups field) use a different structure (map[string]string) to express taints\n    taints:\n    - key: key1\n      value: value1\n      effect: NoSchedule\n    - key: key2\n      effect: NoExecute\n    tags:\n      nodegroup-role: worker\n    iam:\n      withAddonPolicies:\n        externalDNS: true\n        certManager: true\n\n  - name: managed-ng-private\n    instanceType: m5.large\n    # launch nodegroup in private subnets\n    privateNetworking: true\n\n  - name: custom-ami\n    amiFamily: AmazonLinux2\n    ami: ami-custom\n    preBootstrapCommands:\n      # disable hyperthreading\n      - "for n in $(cat /sys/devices/system/cpu/cpu*/topology/thread_siblings_list | cut -s -d, -f2- | tr \',\' \'\\n\' | sort -un); do echo 0 > /sys/devices/system/cpu/cpu$n/online; done"\n    overrideBootstrapCommand: |\n      #!/bin/bash\n      /etc/eks/bootstrap.sh cluster-15\n\n  - name: custom-launch-template\n    launchTemplate:\n      id: lt-1234\n      version: "3"\n`
        },
        {
            value: 'custom-cluster-with-fargate-profiles',
            label: 'custom cluster with fargate profiles',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing fargate profiles',
            filecontent: '# An example of ClusterConfig object creating Fargate profiles.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-16\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\nfargateProfiles:\n  - name: fp-default\n    selectors:\n      # All workloads in the "default" Kubernetes namespace will be\n      # scheduled onto Fargate:\n      - namespace: default\n      # All workloads in the "kube-system" Kubernetes namespace will be\n      # scheduled onto Fargate:\n      - namespace: kube-system\n  - name: fp-dev\n    selectors:\n      # All workloads in the "dev" Kubernetes namespace matching the following\n      # label selectors will be scheduled onto Fargate:\n      - namespace: dev\n        labels:\n          env: dev\n          checks: passed\n    tags:\n      env: dev\n      name: fp-dev\n'
        },
        {
            value: 'custom-cluster-with-permissions-boundary',
            label: 'custom cluster with permissions boundary',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing permissions boundary',
            filecontent: '# An example of ClusterConfig with PermissionsBoundary:\n# For more details on permissions boundaries:\n# https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_bound\n#\n# FIXME: Should the permissions boundary ARN provided be replaced by a real ARN?\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-17\n  region: us-west-2\n\niam:\n  withOIDC: true\n  serviceRolePermissionsBoundary: "arn:aws:iam:11111:policy/entity/boundary"\n  fargatePodExecutionRolePermissionsBoundary: "arn:aws:iam::11111:policy/entity/boundary"\n  serviceAccounts:\n    - metadata:\n        name: s3-reader\n      attachPolicyARNs:\n      - "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"\n      permissionsBoundary: "arn:aws:iam::11111:policy/entity/boundary"\n\nnodeGroups:\n  - name: "ng-1"\n    desiredCapacity: 1\n    iam:\n      instanceRolePermissionsBoundary: "arn:aws:iam::11111:policy/entity/boundary"\n'
        },
        {
            value: 'custom-cluster-with-nodegroup-labels',
            label: 'custom cluster with nodegroup labels',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing nodegroup labels and demonstrating how to force spawning of pods to a desired node group',
            filecontent: '# This example demonstrates how to force the spawning of\n# certain pods to a desired node group.\n#\n# Pre-requisites\n# In order for this sample to work, the pod\'s deployment file\n# should contain the following yaml property.\n#\n# spec:\n#   containers:\n#     - ...omitted for brevity\n#   nodeSelector:\n#     node-class: "compute-intensive-node"\n#\n# Setting labels could be very useful as they allow you to\n# design an infrastructure that is suited for an app\'s use-case.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-18\n  region: us-west-2\n\nnodeGroups:\n  - name: std-ng\n    instanceType: m5.xlarge\n    desiredCapacity: 8\n  - name: ci-ng\n    instanceType: c5.12xlarge\n    desiredCapacity: 8\n    labels:\n      node-class: "compute-intensive-node"\n\n'
        },
        {
            value: 'custom-cluster-with-kms-secrets-encryption',
            label: 'custom cluster with kms secrets encryption',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing kms secrets encryption',
            filecontent: '# An example of ClusterConfig with KMS secrets encryption\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-19\n  region: us-west-2\n\nmanagedNodeGroups:\n- name: ng-1\n  desiredCapacity: 2\n\nsecretsEncryption:\n  # ARN of the KMS key\n  keyARN: "arn:aws:kms:us-west-2:000000000000:key/00000000-0000-0000-0000-000000000000"\n'
        },
        {
            value: 'custom-cluster-with-bottlerocket',
            label: 'custom cluster with bottlerocket',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration showing bottlerocket AMI selection',
            filecontent: '# NOTE: Bottlerocket AMI might not be available in all regions.\n# Please check AWS official doc or below link for more details\n# https://github.com/bottlerocket-os/bottlerocket/blob/develop/QUICKSTART.md#finding-an-ami\n# A simple example of ClusterConfig object with Bottlerocket settings:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-20\n  region: us-west-2\n\nnodeGroups:\n  - name: ng1-public\n    instanceType: m5.xlarge\n    desiredCapacity: 4\n    amiFamily: Bottlerocket\n    labels:\n      "network-locality.example.com/public": "true"\n    bottlerocket:\n      enableAdminContainer: true\n      settings:\n        motd: "Hello, eksctl!"\n\n  - name: ng2-public-ssh\n    instanceType: m5.xlarge\n    desiredCapacity: 4\n    amiFamily: Bottlerocket\n    ssh:\n      # Enable ssh access (via the admin container)\n      allow: true\n      publicKeyName: my-example-keypair\n'
        },
        {
            value: 'custom-cluster-with-launch-template',
            label: 'custom cluster with launch template',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration with a custom launch template',
            filecontent: '# An example of ClusterConfig object using a provided launch template\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-22\n  region: us-west-2\n\nmanagedNodeGroups:\n- name: launch-template-ng\n  launchTemplate:\n    id: lt-1234\n    version: "2" #optional (uses the default version of the launch template if unspecified)\n  labels: {role: worker}\n  tags:\n    nodegroup-role: worker\n  iam:\n    withAddonPolicies:\n      externalDNS: true\n      certManager: true\n\n\n- name: custom-nodegroup\n  instanceType: m5.xlarge\n  desiredCapacity: 2\n  amiFamily: AmazonLinux2\n  ami: ami-0e124de4755b2734d\n  ssh:\n    allow: true\n  securityGroups:\n    attachIDs: ["sg-123", "sg-321"]\n  overrideBootstrapCommand: |\n    #!/bin/bash\n    /etc/eks/bootstrap.sh cluster-22 --kubelet-extra-args \'--node-labels=eks.amazonaws.com/nodegroup=custom-ng,eks.amazonaws.com/nodegroup-image=ami-0e124de4755b2734d\'\n'
        },
        {
            value: 'custom-cluster-with-kubeflow-spot-instances',
            label: 'custom cluster with kubeflow spot instances',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster Configuration with Kubeflow and spot instances',
            filecontent: '# Cost-Optimized EKS cluster for Kubeflow with spot GPU instances and node scale down to zero\n# Built in efforts to reducing training costs of ML workloads.\n# Supporting tutorial can be found at the following link:\n# https://blog.gofynd.com/how-we-reduced-our-ml-training-costs-by-78-a33805cb00cf\n# This spec creates a cluster on EKS with the following active nodes\n# - 2x m5a.2xlarge - Accomodates all pods of Kubeflow\n# It also creates the following nodegroups with 0 nodes running unless a pod comes along and requests for the node to get spun up\n# - m5a.2xlarge   -- Max Allowed 10 worker nodes\n# - p2.xlarge     -- Max Allowed 10 worker nodes\n# - p3.2xlarge    -- Max Allowed 10 worker nodes\n# - p3.8xlarge    -- Max Allowed 04 worker nodes\n# - p3dn.24xlarge -- Max Allowed 01 worker nodes\n\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  # Name of your cluster, change to whatever you find fit.\n  # If changed, make sure to change all nodegroup tags from\n  # \'k8s.io/cluster-autoscaler/cluster-23: "owned"\' --> \'k8s.io/cluster-autoscaler/your-new-name: "owned"\'\n  name: cluster-23\n  # choose your region wisely, this will significantly impact the cost incurred\n  region: us-west-2\n  # 1.14 Kubernetes version since Kubeflow 1.0 officially supports the same\n  version: \'1.14\'\n  tags:\n    # Add more cloud tags if needed for billing\n    environment: staging\n\n# Add all possible AZs to ensure nodes can be spun up in any AZ later on.\n# THIS CAN\'T BE CHANGED LATER. YOU WILL HAVE TO CREATE A NEW CLUSTER TO ADD NEW AZ SUPPORT.\n# This list applies to the whole cluster and isn\'t specific to nodegroups\navailabilityZones: ["us-west-2a", "us-west-1b",  "us-west-1d",  "us-west-1f"]\n\nnodeGroups:\n  - name: ng-1\n    desiredCapacity: 2\n    minSize: 0\n    maxSize: 3\n    # Set one nodegroup with 100GB volumes for Kubeflow to get deployed.\n    # Kubeflow requirement states 1-2 Nodes with 100GB volume attached to the node.\n    volumeSize: 100\n    volumeType: gp2\n    instanceType: m5a.2xlarge\n    availabilityZones: ["us-west-2a"]\n    labels:\n      node-class: "worker-node"\n    tags:\n      # EC2 tags required for cluster-autoscaler auto-discovery\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: OnDemand\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "false"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "0"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        albIngress: true\n        autoScaler: true\n        cloudWatch: true\n\n  - name: ng-2\n    desiredCapacity: 0\n    volumeType: gp2\n    instanceType: m5a.2xlarge\n    availabilityZones: ["us-west-2a"]\n    labels:\n      node-class: "worker-node"\n    tags:\n      # EC2 tags required for cluster-autoscaler auto-discovery\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: OnDemand\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "false"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "0"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        albIngress: true\n        autoScaler: true\n        cloudWatch: true\n\n  - name: 1-gpu-spot-p2-xlarge\n    minSize: 0\n    maxSize: 10\n    instancesDistribution:\n      # set your own max price. AWS spot instance prices no longer cross OnDemand price.\n      # Comment out the field to default to OnDemand as max price.\n      maxPrice: 1.2\n      instanceTypes: ["p2.xlarge"]\n      onDemandBaseCapacity: 0\n      onDemandPercentageAboveBaseCapacity: 0\n      spotAllocationStrategy: capacity-optimized\n    labels:\n      lifecycle: Ec2Spot\n      aws.amazon.com/spot: "true"\n      gpu-count: "1"\n    # Stick to one AZ for all GPU nodes.\n    # In case of termination, this will prevent volumes from being unavailable\n    # if the new instance got spun up in another AZ.\n    availabilityZones: ["us-west-2a"]\n    taints:\n      - key: spotInstance\n        value: "true"\n        effect: PreferNoSchedule\n    tags:\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: Ec2Spot\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "true"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "1"\n      k8s.io/cluster-autoscaler/node-template/taint/spotInstance: "true:PreferNoSchedule"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        autoScaler: true\n        cloudWatch: true\n        albIngress: true\n\n  - name: 1-gpu-spot-p3-2xlarge\n    minSize: 0\n    maxSize: 10\n    instancesDistribution:\n      # set your own max price. AWS spot instance prices no longer cross OnDemand price.\n      # Comment out the field to default to OnDemand as max price.\n      maxPrice: 1.2\n      instanceTypes: ["p3.2xlarge"]\n      onDemandBaseCapacity: 0\n      onDemandPercentageAboveBaseCapacity: 0\n      spotAllocationStrategy: capacity-optimized\n    labels:\n      lifecycle: Ec2Spot\n      aws.amazon.com/spot: "true"\n      gpu-count: "1"\n    # Stick to one AZ for all GPU nodes.\n    # In case of termination, this will prevent volumes from being unavailable\n    # if the new instance got spun up in another AZ.\n    availabilityZones: ["us-west-2a"]\n    taints:\n      - key: spotInstance\n        value: "true"\n        effect: PreferNoSchedule\n    tags:\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: Ec2Spot\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "true"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "1"\n      k8s.io/cluster-autoscaler/node-template/taint/spotInstance: "true:PreferNoSchedule"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        autoScaler: true\n        cloudWatch: true\n        albIngress: true\n\n  - name: 4-gpu-spot-p3-8xlarge\n    minSize: 0\n    maxSize: 4\n    instancesDistribution:\n      # set your own max price. AWS spot instance prices no longer cross OnDemand price.\n      # Comment out the field to default to OnDemand as max price.\n      # maxPrice: 4.4\n      instanceTypes: ["p3.8xlarge"]\n      onDemandBaseCapacity: 0\n      onDemandPercentageAboveBaseCapacity: 0\n      spotAllocationStrategy: capacity-optimized\n    labels:\n      lifecycle: Ec2Spot\n      aws.amazon.com/spot: "true"\n      gpu-count: "4"\n    # Stick to one AZ for all GPU nodes.\n    # In case of termination, this will prevent volumes from being unavailable\n    # if the new instance got spun up in another AZ.\n    availabilityZones: ["us-west-2a"]\n    taints:\n      - key: spotInstance\n        value: "true"\n        effect: PreferNoSchedule\n    tags:\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: Ec2Spot\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "true"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "4"\n      k8s.io/cluster-autoscaler/node-template/taint/spotInstance: "true:PreferNoSchedule"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        autoScaler: true\n        cloudWatch: true\n        albIngress: true\n\n  - name: 8-gpu-spot-p3dn-24xlarge\n    minSize: 0\n    maxSize: 1\n    instancesDistribution:\n      # set your own max price. AWS spot instance prices no longer cross OnDemand price.\n      # Comment out the field to default to OnDemand as max price.\n      maxPrice: 11\n      instanceTypes: ["p3dn.24xlarge"]\n      onDemandBaseCapacity: 0\n      onDemandPercentageAboveBaseCapacity: 0\n      spotAllocationStrategy: capacity-optimized\n    labels:\n      lifecycle: Ec2Spot\n      aws.amazon.com/spot: "true"\n      gpu-count: "8"\n    availabilityZones: ["us-west-2a"]\n    taints:\n      - key: spotInstance\n        value: "true"\n        effect: PreferNoSchedule\n    tags:\n      k8s.io/cluster-autoscaler/node-template/label/lifecycle: Ec2Spot\n      k8s.io/cluster-autoscaler/node-template/label/aws.amazon.com/spot: "true"\n      k8s.io/cluster-autoscaler/node-template/label/gpu-count: "8"\n      k8s.io/cluster-autoscaler/node-template/taint/spotInstance: "true:PreferNoSchedule"\n      k8s.io/cluster-autoscaler/enabled: "true"\n      k8s.io/cluster-autoscaler/cluster-23: "owned"\n    iam:\n      withAddonPolicies:\n        autoScaler: true\n        cloudWatch: true\n        albIngress: true\n'
        },
        {
            value: 'custom-cluster-with-subnets-for-nodegroups',
            label: 'custom-cluster-with-subnets-for-nodegroups',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration specifying subnets for a nodegroup',
            filecontent: '# An example of ClusterConfig object specifying subnets for a nodegroup\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-24\n  region: us-west-2\n\nvpc:\n  id: vpc-0c24b1cc77da8f463\n  cidr: "192.168.0.0/16"\n  subnets:\n    public:\n      public-one:\n        id: subnet-0324095a4f2188967\n        # az: us-west-2a # any unambiguous combination of these is allowed\n        # cidr: 192.168.64.0/19\n      public-two:\n        id: subnet-083814b087bad140b\n      public-three:\n        id: subnet-03a1260affe6f9944\n    private:\n      private-one:\n        cidr: "192.168.160.0/19"\n      private-two:\n        id: subnet-00110ffa3ef259d0c\n      private-three:\n        id: subnet-0a96e24163ef2c9c3\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.xlarge\n    desiredCapacity: 2\n    subnets:\n      - public-one\n      - subnet-083814b087bad140b\n  - name: ng-2\n    instanceType: m5.xlarge\n    desiredCapacity: 2\n    privateNetworking: true\n    subnets:\n      - private-one\n      - private-three\n'
        },
        {
            value: 'custom-cluster-with-addons',
            label: 'custom-cluster-with-addons',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with addons',
            filecontent: 'apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\nmetadata:\n  name: cluster-25\n  region: us-west-2\n  version: "1.18"\n\niam:\n  withOIDC: true\n\nmanagedNodeGroups:\n  - name: mng1\n\naddons:\n- name: vpc-cni # no version is specified so it deploys the default version\n  attachPolicyARNs:\n    - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy\n- name: coredns\n  version: latest # auto discovers the latest available\n- name: kube-proxy\n  version: latest\n- name: aws-ebs-csi-driver\n  wellKnownPolicies:      # add IAM and service account\n    ebsCSIController: true\n'
        },
        {
            value: 'custom-cluster-managed-node-group-spot',
            label: 'custom-cluster-managed-node-group-spot',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with managed node group using spot instances',
            filecontent: '# spot-cluster.yaml\n\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-26\n  region: us-west-2\n\nmanagedNodeGroups:\n- name: spot\n  instanceTypes: ["c3.large","c4.large","c5.large","c5d.large","c5n.large","c5a.large"]\n  spot: true\n\n# `instanceTypes` defaults to [`m5.large`]\n- name: spot-2\n  spot: true\n\n# On-Demand instances\n- name: on-demand\n  instanceTypes: ["c3.large", "c4.large", "c5.large"]\n'
        },
        {
            value: 'custom-cluster-with-openid-connect-provider',
            label: 'custom-cluster-with-openid-connect-provider',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with OpenID Connect provider',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-26\n  region: us-west-2\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\nidentityProviders:\n  - name: cognito-user-pool-1\n    issuerURL: https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Ur78RxTra\n    clientID: 10basodnbu3gs9b1bf9r566btu\n    usernameClaim: email\n    type: oidc\n'
        },
        {
            value: 'custom-cluster-node-group-instance-selector',
            label: 'custom-cluster-node-group-instance-selector',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with node group instance selector',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-28\n  region: us-west-2\n\nnodeGroups:\n- name: ng\n  instanceSelector:\n    vCPUs: 2\n    memory: "4" # 4 GiB, unit defaults to GiB\n\nmanagedNodeGroups:\n- name: mng\n  instanceSelector:\n    vCPUs: 2\n    memory: 2GiB #\n    cpuArchitecture: x86_64 # default value\n\n'
        },
        {
            value: 'custom-cluster-with-karpenter',
            label: 'custom-cluster-with-karpenter',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with Karpenter',
            filecontent: "apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-with-karpenter\n  region: us-west-2\n  version: '1.22'\n  tags:\n    karpenter.sh/discovery: cluster-with-karpenter\n\niam:\n  withOIDC: true\n\nkarpenter:\n  version: 'v0.20.0' # Exact version must be provided\n  createServiceAccount: true # default is false\n  withSpotInterruptionQueue: true # adds all required policies and rules for supporting Spot Interruption Queue, default is false\n\nmanagedNodeGroups:\n  - name: managed-ng-1\n    minSize: 1\n    maxSize: 2\n    desiredCapacity: 1\n"
        },
        {
            value: 'custom-cluster-with-ipv6-ipfamily',
            label: 'custom-cluster-with-ipv6-ipfamily',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with IPv6 ipFamily',
            filecontent: '# An example of ClusterConfig object with ipFamily set to ipv6:\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-2\n  region: us-west-2\n  version: "1.21"\n\nkubernetesNetworkConfig:\n  ipFamily: IPv6\n\naddons:\n  - name: vpc-cni\n    version: latest\n  - name: coredns\n    version: latest\n  - name: kube-proxy\n    version: latest\n\niam:\n  withOIDC: true\n\nmanagedNodeGroups:\n  - name: mng-1\n'
        },
        {

            value: 'custom-cluster-override-bootstrap-command',
            label: 'custom-cluster-override-bootstrap-command',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with overrideBootstrapCommand',
            filecontent: `apiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: override-unmanaged-nodegroup-bootstrap\n  region: us-west-2\n  version: \'1.21\'\n\nnodeGroups:\n  - name: ng-1\n    minSize: 1\n    maxSize: 2\n    amiFamily: AmazonLinux2\n    ami: ami-12345\n    desiredCapacity: 1\n    overrideBootstrapCommand: |\n      #!/bin/bash\n      source /var/lib/cloud/scripts/eksctl/bootstrap.helper.sh\n      /etc/eks/bootstrap.sh override-unmanaged-nodegroup-bootstrap --container-runtime containerd --kubelet-extra-args "--node-labels=$NODE_LABELS"\n`
        },
        {
            value: 'custom-cluster-custom-container-runtime',
            label: 'custom-cluster-custom-container-runtime',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'ClusterConfig containing Windows and Linux node groups to support Windows workloads on containerd runtime.\n',
            filecontent: '# An example of ClusterConfig containing Windows and Linux node groups to support Windows workloads on containerd runtime.\n# This example should be run with `eksctl create cluster -f 32-windows-nodes-with-containerd.yaml`.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: windows-cluster\n  region: us-west-2\n\nnodeGroups:\n  - name: windows-ng\n    amiFamily: WindowsServer2019FullContainer\n    minSize: 2\n    maxSize: 3\n    containerRuntime: containerd\n\n  - name: custom-windows\n    amiFamily: WindowsServer2022FullContainer\n    ami: ami-01579b74557facaf7\n    overrideBootstrapCommand: |\n      & $EKSBootstrapScriptFile -EKSClusterName "$EKSClusterName" -APIServerEndpoint "$APIServerEndpoint" -Base64ClusterCA "$Base64ClusterCA" -ContainerRuntime "containerd" -KubeletExtraArgs "$KubeletExtraArgs" 3>&1 4>&1 5>&1 6>&1\n\nmanagedNodeGroups:\n  - name: linux-ng\n    instanceType: t2.large\n    minSize: 2\n    maxSize: 3\n'
        },
        {
            value: 'custom-cluster-configuration-local-zones',
            label: 'custom-cluster-configuration-local-zones',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration with local zones support',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-33\n  region: us-west-2\n\nlocalZones: ["us-west-2-lax-1a", "us-west-2-lax-1b"]\n\nnodeGroups:\n  - name: local-ng\n    # `nodeGroup.localZones` should be a subset of the zones specified in `ClusterConfig.localZones`\n    localZones: ["us-west-2-lax-1a", "us-west-2-lax-1b"]\n'
        },
        {
            value: 'custom-cluster-configuration-managed-nodegroup-taints',
            label: 'custom-cluster-configuration-managed-nodegroup-taints',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'Cluster configuration showing managed node group taints support',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: taints-1\n  region: us-west-2\n\n# Unmanaged nodegroups with and without taints.\nnodeGroups:\n  - name: ng1-public\n    instanceType: m5.xlarge\n    minSize: 2\n    maxSize: 8\n    taints:\n      - key: your.domain.com/db\n        value: "true"\n        effect: NoSchedule\n      - key: your.domain.com/production\n        value: "true"\n        effect: NoExecute\n  - name: ng2-private\n    instanceType: m5.xlarge\n    minSize: 2\n    maxSize: 8\n    privateNetworking: true\n    taints:\n      - key: your.domain.com/sensitive-information\n        value: "true"\n        effect: NoSchedule\n  - name: ng3-public\n    instanceType: m5.xlarge\n    minSize: 2\n    maxSize: 8\n\n# Managed nodegroups with taints.\nmanagedNodeGroups:\n  - name: mng1-public\n    taints:\n      - key: your.domain.com/memory-pressure\n        value: "true"\n        effect: PreferNoSchedule\n      - key: your.domain.com/needs-auth\n        value: "true"\n        effect: NoExecute\n'
        },
        {
            value: 'custom-cluster-configuration-iam-identity-mappings',
            label: 'custom-cluster-configuration-iam-identity-mappings',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb:'Cluster configuration with IAM identity mappings',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: cluster-with-iamidentitymappings\n  region: us-west-2\n\niamIdentityMappings:\n  - arn: arn:aws:iam::000000000000:role/myAdminRole\n    groups:\n      - system:masters\n    username: admin\n    noDuplicateARNs: true # prevents shadowing of ARNs\n\n  - arn: arn:aws:iam::000000000000:user/myUser\n    username: myUser\n    noDuplicateARNs: true # prevents shadowing of ARNs\n\n  # This will fail if present during cluster creation as the namespace needs to exist\n  - serviceName: emr-containers\n    namespace: emr # serviceName requires namespace\n\n  - account: "000000000000" # account must be configured with no other options\n\nnodeGroups:\n  - name: ng-1\n    instanceType: m5.large\n    desiredCapacity: 1\n\n'
        },
        {
            value: 'cluster-configuration-with-outpost',
            label: 'cluster-configuration-with-outpost',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: ' An example ClusterConfig that creates the EKS control plane\non AWS Outposts. Since the VPC will be created by eksctl, it\nwill lack connectivity to the API server because eksctl does\nnot associate the VPC with the local gateway. Therefore, the\ncommand must be run with `--without-nodegroup`, as in\n`eksctl create cluster -f examples/35-outposts.yaml\n--without-nodegroup`, and the nodegroups can be created\nafter ensuring connectivity to the API server.',
            filecontent: '# An example ClusterConfig that creates the EKS control plane on AWS Outposts.\n# Since the VPC will be created by eksctl, it will lack connectivity to the API server because eksctl does not\n# associate the VPC with the local gateway. Therefore, the command must be run with `--without-nodegroup`, as in\n# `eksctl create cluster -f examples/35-outposts.yaml --without-nodegroup`, and the nodegroups can be created after\n# ensuring connectivity to the API server.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: outpost\n  region: us-west-2\n\nnodeGroups:\n  - name: ng\n    # Optional, defaults to the smallest available instance type on the Outpost.\n    instanceType: m5d.large\n    privateNetworking: true\n\noutpost:\n  # Required.\n  controlPlaneOutpostARN: "arn:aws:outposts:us-west-2:1234:outpost/op-1234"\n  # Optional, defaults to the smallest available instance type on the Outpost.\n  controlPlaneInstanceType: m5d.large\n\n  # Optional\n  controlPlanePlacement:\n    groupName: placement-group-name\n'
        },
        {
            value: 'cluster-configuration-with-outpost-vpc',
            label: 'cluster-configuration-with-outpost-vpc',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: 'An example ClusterConfig that creates the EKS control plane on AWS Outposts.\n',
            filecontent: '# An example ClusterConfig that creates the EKS control plane on AWS Outposts.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: outpost-vpc\n  region: us-west-2\n\nvpc:\n  id: vpc-1234\n  subnets:\n    private:\n      outpost-subnet-1:\n        id: subnet-1234\n\nnodeGroups:\n  - name: ng\n    # Optional, defaults to the smallest available instance type on the Outpost.\n    instanceType: m5d.large\n    privateNetworking: true\n\noutpost:\n  # Required.\n  controlPlaneOutpostARN: "arn:aws:outposts:us-west-2:1234:outpost/op-1234"\n  # Optional, defaults to the smallest available instance type on the Outpost.\n  controlPlaneInstanceType: m5d.large\n'
        },
        {
            value: 'cluster-configuration-with-outpost-vpc-private',
            label: 'cluster-configuration-with-outpost-vpc-private',
            usage: 'eksctl create cluster -f cluster.yaml',
            nb: ' An example ClusterConfig that creates a fully-private\ncluster on AWS Outposts. Since the VPC will be created by\neksctl, it will lack connectivity to the API server because\neksctl does not associate the VPC with the local gateway.\nTherefore, the command must be run with `--without-\nnodegroup`, as in `eksctl create cluster -f\nexamples/37-outposts.yaml --without-nodegroup`, and the\nnodegroups can be created after ensuring connectivity to the\nAPI server.',
            filecontent: '# An example ClusterConfig that creates a fully-private cluster on AWS Outposts.\n# Since the VPC will be created by eksctl, it will lack connectivity to the API server because eksctl does not\n# associate the VPC with the local gateway. Therefore, the command must be run with `--without-nodegroup`, as in\n# `eksctl create cluster -f examples/37-outposts.yaml --without-nodegroup`, and the nodegroups can be created after\n# ensuring connectivity to the API server.\n---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: outpost-fully-private\n  region: us-west-2\n  version: "1.21"\n\nprivateCluster:\n  enabled: true\n\nnodeGroups:\n  - name: ng\n    # Optional, defaults to the smallest available instance type on the Outpost.\n    instanceType: m5d.large\n    privateNetworking: true\n\noutpost:\n  # Required.\n  controlPlaneOutpostARN: "arn:aws:outposts:us-west-2:1234:outpost/op-1234"\n  # Optional, defaults to the smallest available instance type on the Outpost.\n  controlPlaneInstanceType: m5d.large\n\n  # Optional\n  controlPlanePlacement:\n    groupName: placement-group-name\n'
        }
    ],
    'non_eksctl_create':[
        {
            value: 'non_eksctl_create_nodegroup',
            label: 'a nodegroup',
            usage: 'eksctl create nodegroup',
            nb: 'In order to create nodegroups or managed nodegroups\n on a cluster which was not created by eksctl,\na config file containing VPC details must be provided',
            filecontent: '---\napiVersion: eksctl.io/v1alpha5\nkind: ClusterConfig\n\nmetadata:\n  name: non-eksctl-created-cluster\n  region: us-west-2\n\nvpc:\n  id: "vpc-12345"\n  securityGroup: "sg-12345"    # this is the ControlPlaneSecurityGroup\n  subnets:\n    private:\n      private1:\n          id: "subnet-12345"\n      private2:\n          id: "subnet-67890"\n    public:\n      public1:\n          id: "subnet-12345"\n      public2:\n          id: "subnet-67890"'
        },
        {
            value: 'non_eksctl_create_fargateprofile',
            label: 'a fargateprofile',
            usage: 'eksctl create fargateprofile',
        },
        {
            value: 'non_eksctl_create_iamserviceaccount',
            label: 'an iamserviceaccount',
            usage: 'eksctl create iamserviceaccount',
        },
        {
            value: 'non_eksctl_create_iamidentitymapping',
            label: 'an iamidentitymapping',
            usage: 'eksctl create iamidentitymapping',
        }
    ],
    'non_eksctl_get': [
        {
            value: 'non_eksctl_get_cluster',
            label: 'get a cluster',
            usage: 'eksctl get cluster',
        },
        {
            value: 'non_eksctl_get_fargateprofile',
            label: 'get a fargateprofile',
            usage: 'eksctl get fargateprofile',
        },
        {
            value: 'non_eksctl_get_nodegroup',
            label: 'get a nodegroup',
            usage: 'eksctl get nodegroup',
        },
        {
            value: 'non_eksctl_label',
            label: 'get a label',
            usage: 'eksctl get label'
        }
    ],
    'non_eksctl_delete': [
        {
            value: 'non_eksctl_delete_cluster',
            label: 'delete a cluster',
            usage: 'eksctl delete cluster',
        },
        {
            value: 'non_eksctl_delete_nodegroup',
            label: 'delete a nodegroup',
            usage: 'eksctl delete nodegroup',
        },
        {
            value: 'non_eksctl_delete_fargateprofile',
            label: 'delete a fargateprofile',
            usage: 'eksctl delete fargateprofile',
        },
        {
            value: 'non_eksctl_delete_iamserviceaccount',
            label: 'delete an iamserviceaccount',
            usage: 'eksctl delete iamserviceaccount',
        },
        {
            value: 'non_eksctl_delete_iamidentitymapping',
            label: 'delete an iamidentitymapping',
            usage: 'eksctl delete iamidentitymapping',
        }
    ],
    'non_eksctl_upgrade': [
        {
            value: 'non_eksctl_upgrade_cluster',
            label: 'upgrade a cluster',
            usage: 'eksctl upgrade cluster',
        },
        {
            value: 'non_eksctl_upgrade_nodegroup',
            label: 'upgrade a nodegroup',
            usage: 'eksctl upgrade nodegroup',
        }
    ],
    'non_eksctl_set_unset': [
        {
            value: 'non_eksctl_set_labels',
            label: 'set labels',
            usage: 'eksctl set labels',
        },
        {
            value: 'non_eksctl_unset_labels',
            label: 'unset labels',
            usage: 'eksctl unset labels',
        }
    ],
    'non_eksctl_scale': [
        {
            value: 'non_eksctl_scale_nodegroup',
            label: 'scale a nodegroup',
            usage: 'eksctl scale nodegroup',
        }
    ],
    'non_eksctl_drain': [
        {
            value: 'non_eksctl_drain_nodegroup',
            label: 'drain a nodegroup',
            usage: 'eksctl drain nodegroup',
        },
        {
            value: 'non_eksctl_drain_nodegroup_force',
            label: 'drain a nodegroup with force',
            usage: 'eksctl drain nodegroup --force',
        }
    ],
    'non_eksctl_enable': [
        {
            value: 'non_eksctl_enable_profile',
            label: 'enable a profile',
            usage: 'eksctl enable profile',
        },
        {
            value: 'non_eksctl_enable_repo',
            label: 'enable a repo',
            usage: 'eksctl enable repo',
        }
    ],
    'non_eksctl_utils': [
        {
            value: 'non_eksctl_associate_iam_oidc_provider',
            label: 'associate an iam oidc provider',
            usage: 'eksctl utils associate-iam-oidc-provider',
        },
        {
            value: 'non_eksctl_describe_stacks',
            label: 'describe stacks',
            usage: 'eksctl utils describe-stacks',
        },
        {
            value: 'non_eksctl_install_vpc_controllers',
            label: 'install vpc controllers',
            usage: 'eksctl utils install-vpc-controllers',
        },
        {
            value: 'non_eksctl_nodegroup_health',
            label: 'nodegroup health',
            usage: 'eksctl utils nodegroup-health',
        },
        {
            value: 'non_eksctl_set_public_access_cidrs',
            label: 'set public access cidrs',
            usage: 'eksctl utils set-public-access-cidrs',
        },
        {
            value: 'non_eksctl_update_cluster_endpoints',
            label: 'update cluster endpoints',
            usage: 'eksctl utils update-cluster-endpoints',
        },
        {
            value: 'non_eksctl_update_cluster_logging',
            label: 'update cluster logging',
            usage: 'eksctl utils update-cluster-logging',
        },
        {
            value: 'non_eksctl_write_kubeconfig',
            label: 'write kubeconfig',
            usage: 'eksctl utils write-kubeconfig',
        },
        {
            value: 'non_eksctl_update_coredns',
            label: 'update coredns',
            usage: 'eksctl utils update-coredns',
        },
        {
            value: 'non_eksctl_update_aws_node',
            label: 'update aws node',
            usage: 'eksctl utils update-aws-node',
        },
        {
            value: 'non_eksctl_update_kube_proxy',
            label: 'update kube proxy',
            usage: 'eksctl utils update-kube-proxy',
        }
    ],
    'addon': [
        {
            value: 'create-addon',
            label: 'install a latest version of an addon',
            usage: 'eksctl create addon --cluster $CLUSTER_NAME --name $ADDON_NAME',
            nb: 'Installs the latest version of an addon to a cluster.\n\nAddon name could "adot", "kube-proxy", "vpc-cni", "coredns", "aws-ebs-csi-driver" or any other addon applicable for the cluster.'
        },

    ],
    'delete_resource_cluster': [
        {
            value: 'delete-resource-cluster',
            label: 'a cluster with all of its resources',
            usage: 'eksctl delete cluster --name $CLUSTER_NAME',
            nb: 'Deletes a cluster and all of its resources.'
        },
        {
            value: 'delete-cluster-wait',
            label: 'a cluster with all of its resources and wait for the deletion to complete',
            usage: 'eksctl delete cluster --name $CLUSTER_NAME --wait',
            nb: 'Deletes a cluster and all of its resources and waits for the deletion to complete.'
        },
        {
            value: 'delete-cluster-disable-nodegroup-eviction',
            label: 'a cluster with all of its resources and disable nodegroup eviction',
            usage: 'eksctl delete cluster --name $CLUSTER_NAME --disable-nodegroup-eviction',
            nb: 'Deletes a cluster and all of its resources and disables nodegroup eviction.'
        }
    ],
    'fargate-profile': [
        {
            value: 'fargate-profile-option',
            label: 'with default options.',
            usage: 'eksctl create fargateprofile --cluster $CLUSTER_NAME --name $FARGATE_PROFILE_NAME --namespace $FARGATE_PROFILE_NAMESPACE',
            nb: 'Creates a Fargate profile with default options.\n\nFargate profile will be created with workloads of $FARGATE_PROFILE_NAMESPACE Kubernetes namespace scheduled into fargate.'
        }
    ],

    'iamserviceaccount': [
        {
            value: 'iamserviceaccount-option',
            label: 'with an example policy.',
            usage: 'eksctl create iamserviceaccount --name $IAM_ACCOUNT_NAME  --namespace $IAM_ACCOUNT_NAMESPACE --cluster $CLUSTER_NAME   --attach-policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess  --approve     --override-existing-serviceaccounts',
            nb: 'will create a IAM role bound to a service account with an example policy, which is read-only access to S3.\n\nsubstitute --attach-policy-arn with policy ARN for creating other types service accounts.'
        },

    ],

    'nodegroup': [
        {
            value: 'nodegroup-option',
            label: 'with default options.',
            usage: 'eksctl create nodegroup --cluster $CLUSTER_NAME --name $NODE_GROUP_NAME',
            nb: 'Creates a nodegroup with default options.\n\nNodegroup will be created with 2 m5.large EC2 instances.'
        },
    ],

    'iamidentitymapping': [
        {
            value: 'iamidentitymapping-option',
            label: 'map a clusterrole to clusterrolebinding',
            usage: 'eksctl create iamidentitymapping --cluster $CLUSTER_NAME --arn $ARN --username $USERNAME --group $GROUP',
            nb: 'Creates an IAM identity mapping with default options.\n\nIAM identity mapping will be created with $ARN, $USERNAME, and $GROUP.\n\nUse kubectl get clusterrole to view clusterroles.\n\nUse kubectl get clusterrolebinding to view clusterrolebindings.\n\nUse eksctl get iamidentitymapping --cluster $CLUSTER_NAME to view iamidentitymappings and to find --arn format for account/role.'
        },
    ],

    'list-clusters': [
        {
            value: 'list-clusters-option',
            label: 'list clusters',
            usage: 'eksctl get clusters',
            nb: 'Lists all EKS clusters in the current AWS account and region.\n\nYou can narrow down the region with --region flag.\n\nYou can also use the AWS CLI to list clusters: aws eks list-clusters'
        }
    ],
    'list-addons': [
        {
            value: 'list-addons-option',
            label: 'list addons',
            usage: 'eksctl get addons --cluster $CLUSTER_NAME',
            nb: 'Lists all addons installed on a cluster.\n\nYou can also use the AWS CLI to list addons: aws eks list-addons --cluster-name $CLUSTER_NAME'
        }
    ]
};