const options = [
    { value: 'create', label: 'create' },
    { value: 'install', label: 'install' },
    { value: 'list', label: 'list' },
    { value: 'delete_resource', label: 'delete' },
    { value: 'enable_logging', label: 'enable cloudwatch logging on my cluster' },
    { value: 'iam_oidc', label: 'create and associate IAM Open ID Connect provider' },
    { value: 'describe_addons', label: 'list addons available for my cluster' },
];

export const primaryOptions = options.sort((x, y) => {
    if (x.value < y.value) {
        return -1;
    }
    if (x.value > y.value) {
        return 1;
    }
    return 0;
});
