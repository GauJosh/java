FROM codefresh/cfstep-helm:3.1.2

WORKDIR /workspace/helmfile
COPY . /workspace/helmfile

ARG HELM_VERSION=3.7.2
ARG HELMFILE_VERSION=0.145.3
ARG HELM_DIFF_VERSION=3.5.0
ARG HELM_SECRETS_VERSION=3.15.0
ARG HELM_SHA256="4ae30e48966aba5f807a4e140dad6736ee1a392940101e4d79ffb4ee86200a9e"
ARG HELM_LOCATION="https://get.helm.sh"
ARG HELM_FILENAME="helm-${HELM_VERSION}-linux-amd64.tar.gz"

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
    wget ${HELM_LOCATION}/${HELM_FILENAME} && \
    echo Verifying ${HELM_FILENAME}... && \
    sha256sum ${HELM_FILENAME} | grep -q "${HELM_SHA256}" && \
    echo Extracting ${HELM_FILENAME}... && \
    tar zxvf ${HELM_FILENAME} && mv /linux-amd64/helm /usr/local/bin/ && \
    ls -lrt /usr/local/bin && \
    rm ${HELM_FILENAME} && rm -r /linux-amd64 && \
    ls -rlt /workspace/helmfile/dist/

RUN chmod 0755 /bin/helmfile
RUN chmod 0751 /root

LABEL helm="${HELM_VERSION}"
LABEL helmfile="${HELMFILE_VERSION}"
LABEL helmdiff="${HELM_DIFF_VERSION}"

 COPY lib/helmfile.py /helmfile.py
 COPY /workspace/helmfile/dist/helmfile_linux_amd64 /usr/local/bin/helmfile

 ENTRYPOINT ["python3", "/helmfile.py"]
