# Variable for AWS Region
variable "region" {
  type        = string
  description = "aws-region"
}

variable "s3_bucket_name" {
  type        = string
  description = "s3 bucket name"
}

variable "s3_bucket_frontend_hosting" {
  type        = string
  description = "s3 bucket name for frontend hosting purpose"
}

provider "aws" {
  region  = var.region
  version = "5.31.0"
}

# Local variables for VPC
locals {
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
  azs             = ["ap-southeast-4a", "ap-southeast-4b"]
}

# VPC Initialization
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.0"

  name = "dtran-vpc"
  cidr = "10.0.0.0/16"
  single_nat_gateway = true
  enable_dns_hostnames = true
  enable_nat_gateway   = true

  public_subnets  = local.public_subnets
  private_subnets = local.private_subnets

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb"     = 1
    "kubernetes.io/cluster/dtran-cluster" = "owned"
  }
  map_public_ip_on_launch = true
  public_subnet_tags = {
    "kubernetes.io/role/elb"              = 1,
    "kubernetes.io/cluster/dtran-cluster" = "owned"
  }

  azs = local.azs

  tags = {
    Environment = "test"
    Terraform   = "true"
  }
}

#module "iam" {
#  source = "./iam"
#}
#
#module "mq" {
#  source     = "./mq"
#  subnet_ids = module.vpc.private_subnets
#  vpc_id     = module.vpc.vpc_id
#}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 19.0"
  cluster_name    = "dtran-cluster"
  cluster_version = "1.28"

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = concat(module.vpc.public_subnets, module.vpc.private_subnets)

  cluster_addons = {
    coredns = {
      version = "v1.10.1-eksbuild.5"
    }
    kube-proxy = {
      version = "v1.14.1-eksbuild.1"
    }
    vpc-cni = {
      version = "v1.28.1-eksbuild.1"
    }
  }

  cluster_ip_family = "ipv4"
}


module "eks_managed_node_group" {
  source       = "terraform-aws-modules/eks/aws//modules/eks-managed-node-group"
  version      = "19.21.0"
  cluster_name = module.eks.cluster_name
  name         = "dtran-node-group-1"
  subnet_ids   = module.vpc.private_subnets
  labels = {
    "subnet.layer" = "private"
  }
  #  iam_role_arn = "arn:aws:iam::583026587168:role/AmazonEKSNodeRole"
  #  iam_role_use_name_prefix = false

  instance_types = ["t3.small"]
  #  Node specification
  ami_type      = "AL2_x86_64"
  capacity_type = "ON_DEMAND"



  min_size     = 1
  max_size     = 3
  desired_size = 2

  tags = {
    Terraform   = "true"
    Environment = "test"
  }
}
