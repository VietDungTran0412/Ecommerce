#!/bin/bash
eksctl create iamserviceaccount \
  --cluster=dtran-cluster \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --attach-policy-arn=arn:aws:iam::583026587168:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve


kubectl apply \
    --validate=false \
    -f https://github.com/jetstack/cert-manager/releases/download/v1.12.3/cert-manager.yaml