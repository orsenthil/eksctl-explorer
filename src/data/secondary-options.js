export const secondaryOptions = {
    install: [
        {
            value: 'install-eksctl',
            label: 'eksctl',
        },
    ],
    create : [
        {
            value: 'default-cluster',
            label: 'a cluster',
        },
        {
            value: 'addon',
            label: 'an addon',
        },
        {
            value: 'fargate-profile',
            label: 'a fargate profile',
        },
        {
            value: 'iamserviceaccount',
            label: 'an iam service account',
        },
        {
            value: 'nodegroup',
            label: 'a node group',
        },
        {
            value: 'iamidentitymapping',
            label: 'an iam identity mapping',
        },
        {
            value: 'custom-windows-cluster',
            label: 'a custom windows cluster',
        }
    ],
    register : [
        {
            value: 'register-eks',
            label: 'an eks cluster',
            usage: 'eksctl register cluster $CLUSTER_NAME --name --provider $PROVIDER',
            nb: 'Register a non EKS cluster, including those hosted on other cloud providers, via EKS Connector.\n\nhttps://docs.aws.amazon.com/eks/latest/userguide/eks-connector.html',

        }
   ],
    non_eksctl : [
        {
            value: 'non_eksctl_create',
            label: 'create'
        },
        {
            value: 'non_eksctl_get',
            label: 'get'
        },
        {
            value: 'non_eksctl_delete',
            label: 'delete'
        },
        {
            value: 'non_eksctl_upgrade',
            label: 'upgrade'
        },
        {
            value: 'non_eksctl_set_unset',
            label: 'set/unset'
        },
        {
            value: 'non_eksctl_scale',
            label: 'scale'
        },
        {
            value: 'non_eksctl_drain',
            label: 'drain'
        },
        {
            value: 'non_eksctl_enable',
            label: 'enable'
        },
        {
            value: 'non_eksctl_utils',
            label: 'utils'
        }
   ],
    delete_resource : [
        {
            value: 'delete_resource_cluster',
            label: 'a cluster',
        },
    ],
    list : [
        {
            value: 'list-clusters',
            label: 'clusters',
        },
        {
            value: 'list-addons',
            label: 'addons installed in my cluster',
        }
    ],
    enable_logging : [
        {
            value: 'enable-all-logs',
            label: 'enable all logs',
            usage: 'eksctl utils update-cluster-logging --enable-types=all --region=$AWS_REGION --cluster=$CLUSTER_NAME --approve',
            nb: 'would update CloudWatch logging for cluster (enable types: api, audit, authenticator, controllerManager, scheduler).\n\n "all" will enable all types of logs, use "no" to disable',
        },
    ],
    describe_addons: [
        {
            value: 'describe-all-addons',
            label: 'all addons',
            usage: 'eksctl utils describe-addon-versions --cluster $CLUSTER_NAME --verbose 0 | jq .',
            nb: 'would list all addons available for cluster.\n\njq tool is used for friendly formatting of output.',
        },
        {
            value: 'describe-particular-addon',
            label: 'a particular addon',
            usage: 'eksctl utils describe-addon-versions --cluster $CLUSTER_NAME --addon $ADDON_NAME --verbose 0 | jq .',
            nb: 'would list all versions of a particular addon available for cluster.\n\nAddon name could "adot", "kube-proxy", "vpc-cni", "coredns", "aws-ebs-csi-driver" or any other addon applicable for the cluster.\n\njq tool is used for friendly formatting of output.',
        },
    ],
    iam_oidc: [
        {
            value: 'create-oidc-provider',
            label: 'create an OIDC provider',
            usage: 'eksctl utils associate-iam-oidc-provider --region=$AWS_REGION --cluster=$CLUSTER_NAME --approve',
            nb: 'would create an OIDC provider for cluster.',
        },
    ],
};
