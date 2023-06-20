import textwrap

msg = """
The values specified in the config file for the the fields in kubeletExtraconfig will completely overwrite the default values specified by eksctl. Config files can include the kubeletExtraConfig field which accepts a free form yaml that will be embedded into the kubelet.yaml.
"""

print(repr("\n".join(textwrap.wrap(msg, width=60))))