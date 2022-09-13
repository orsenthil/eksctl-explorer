export const secondaryOptions = {
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
    ],
    list : [
        {
            value: 'list-clusters',
            label: 'clusters',
        },
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
