FROM amazonlinux:2022

USER root

RUN mkdir -p /deployments

# JAVA_APP_DIR is used by run-java.sh for finding the binaries
ENV JAVA_APP_DIR=/deployments \
    JAVA_MAJOR_VERSION=8


# /dev/urandom is used as random source, which is prefectly safe
# according to http://www.2uo.de/myths-about-urandom/
#RUN yum install -y \
#       java-1.8.0-openjdk-1.8.0.322.b06-1.el7_9 \ 
RUN yum install -y wget tar gzip \
    && mkdir /usr/java \
    && cd /usr/java \
    && wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.tar.gz" \
    && tar -xf jdk-8u131-linux-x64.tar.gz \
    && export JAVA_HOME=/usr/java/jdk1.8.0_131 >> /etc/profile \
    && export JRE_HOME=/usr/java/jdk1.8.0_131/jre >> /etc/profile \
    && export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin >> /etc/profile \
    && echo "securerandom.source=file:/dev/urandom" >> /usr/java/jdk1.8.0_131/jre/lib/security/java.security \
    && yum update -y \
           nss nss-util nss-softokn nspr \
    && yum clean all

ENV JAVA_HOME /etc/alternatives/jre

# Agent bond including Jolokia and jmx_exporter
ADD agent-bond-opts /opt/run-java-options
RUN mkdir -p /opt/agent-bond \
 && curl https://repo.maven.apache.org/maven2/io/fabric8/agent-bond-agent/1.2.0/agent-bond-agent-1.2.0.jar \
          -o /opt/agent-bond/agent-bond.jar \
 && chmod 444 /opt/agent-bond/agent-bond.jar \
 && chmod 755 /opt/run-java-options
ADD jmx_exporter_config.yml /opt/agent-bond/
EXPOSE 8778 9779

# Add run script as /deployments/run-java.sh and make it executable
COPY run-java.sh /deployments/
RUN chmod 755 /deployments/run-java.sh



# Run under user "jboss" and prepare for be running
# under OpenShift, too
RUN groupadd -r jboss -g 1000 \
  && useradd -u 1000 -r -g jboss -m -d /opt/jboss -s /sbin/nologin jboss \
  && chmod 755 /opt/jboss \
  && chown -R jboss /deployments \
  && usermod -g root -G `id -g jboss` jboss \
  && chmod -R "g+rwX" /deployments \
  && chown -R jboss:root /deployments

USER jboss


CMD [ "/deployments/run-java.sh" ]
