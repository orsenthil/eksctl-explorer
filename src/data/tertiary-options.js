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
            usage: 'eksctl create cluster --name $USER-$(date +%d%b) --version 1.22 --region us-west-2 --with-oidc --ssh-access --nodegroup-name standard-workers --node-type c5.xlarge --nodes 5 --nodes-min 1 --nodes-max 5 --auto-kubeconfig',
            nb: 'Creates an EKS cluster with five managed nodes.\n\nKubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.\n\nCloudWatch logging is not enabled.\n\nSSH access is enabled for the cluster.\n\nOIDC is enabled for the cluster.\n\neksctl-managed nodegroups are enabled for the cluster. A custom node type of c5.xlarge is used.'
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