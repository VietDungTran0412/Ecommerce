#!/bin/bash
yum update -y
yum install -y docker
usermod -a -G docker ec2-user
id ec2-user
newgrp docker
yum install -y python3-pip
pip3 install docker-compose
systemctl enable docker.service
systemctl start docker.service