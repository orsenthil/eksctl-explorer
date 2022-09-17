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
            nb: 'Creates an EKS cluster with two managed nodes.\n\nKubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.\n\nCloudWatch logging is not enabled.'
        },
        {
            value: 'default-cluster-dry-run',
            label: 'as a dry run',
            usage: 'eksctl create cluster --dry-run',
            nb: 'Prints eksctl cluster manifest yaml to stdout without creating the cluster.'
        },
        {
            value: 'default-cluster-with-ssh',
            label: 'with a new ssh access',
            usage: 'eksctl create cluster --ssh-access',
            nb: 'Creates an EKS cluster with two managed nodes.\n\nKubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster.\n\nCloudWatch logging is not enabled.\n\nSSH access is enabled for the cluster.'
        },
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
