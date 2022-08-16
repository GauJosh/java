FROM codefresh/cfstep-helm:3.1.2

ARG HELM_VERSION=3.7.2
ARG HELMFILE_VERSION=0.145.3
ARG HELM_DIFF_VERSION=3.5.0
ARG HELM_SECRETS_VERSION=3.15.0
ARG HELM_FILENAME="helmfile-${HELMFILE_VERSION}-linux-amd64.tar.gz"

# Install required Alpine packages

RUN apk add --update \
    linux-headers \
    git \
    python3 && \
    rm -rf /var/cache/apk/*

# Install helmfile plugin deps

RUN helm plugin install https://github.com/databus23/helm-diff --version ${HELM_DIFF_VERSION} && \
    helm plugin install https://github.com/jkroepke/helm-secrets --version ${HELM_SECRETS_VERSION}

# Install helmfile

# ADD https://github.com/helmfile/helmfile/releases/download/v${HELMFILE_VERSION}/helmfile_${HELMFILE_VERSION}_linux_amd64.tar.gz /bin/helmfile
# RUN chmod 0755 /bin/helmfile

RUN set -x && \
    wget https://github.com/helmfile/helmfile/releases/download/v${HELMFILE_VERSION}/helmfile_${HELMFILE_VERSION}_linux_amd64.tar.gz && \
    echo Extracting ${HELM_FILENAME}... && \
    tar zxvf helmfile_${HELMFILE_VERSION}_linux_amd64.tar.gz && cp /helmfile /usr/local/bin/ && \
    ls -lrt ./ && \
    echo Listing inside bin... && \
    ls -lrt /usr/local/bin && \
    rm helmfile_${HELMFILE_VERSION}_linux_amd64.tar.gz && \

RUN chmod 0755 /usr/local/bin/helmfile

LABEL helm="${HELM_VERSION}"
LABEL helmfile="${HELMFILE_VERSION}"
LABEL helmdiff="${HELM_DIFF_VERSION}"

COPY lib/helmfile.py /helmfile.py
ENTRYPOINT ["python3", "/helmfile.py"]
