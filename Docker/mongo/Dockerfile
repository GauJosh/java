FROM 236900137235.dkr.ecr.us-west-2.amazonaws.com/fabric8/java-centos-openjdk8-jre:1.9.6_OracleLinux_8.6
USER root

COPY mongodb-org-6.0.repo /etc/yum.repos.d/mongodb-org-6.0.repo
RUN yum install -y mongodb-mongosh

RUN mkdir /apps
WORKDIR /apps
