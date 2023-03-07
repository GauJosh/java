FROM 236900137235.dkr.ecr.us-west-2.amazonaws.com/falcosecurity/falco-no-driver:0.34.1

RUN apt-get -y update && apt-get -y install ca-certificates

COPY libk8saudit-eks.so /usr/share/falco/plugins/libk8saudit-eks.so

# COPY k8s_audit_rules.yaml /etc/falco/
# COPY k8s_audit_rules.yaml /k8s_audit_eks_rules.yaml
