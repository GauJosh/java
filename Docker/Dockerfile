FROM argoproj/argocd:v1.5.7

USER root
RUN apt-get update && \
    apt-get install -y \
        curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER argocd

# ARG GCS_PLUGIN_VERSION="0.3.5"
# ARG GCS_PLUGIN_REPO="https://github.com/hayorov/helm-gcs.git"

RUN helm plugin install https://github.com/chartmuseum/helm-push

ENV HELM_PLUGINS="/home/argocd/.local/share/helm/plugins/"
ENV HELM_REPO_KEY_FILE=6285884658067858c376d985.8d74da00942b61fc76bfda1fea9cdbbb
