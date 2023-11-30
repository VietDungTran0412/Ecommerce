provider "aws" {
  region = "ap-southeast-2"
}


module "dtran_vpc" {
  source = "./vpc"
}

module "ec2_db_server" {
  source = "./ec2"
  vpc_id = module.dtran_vpc.vpc.id
  depends_on = [ module.dtran_vpc ]
}

module "alb" {
  source = "./alb"
  public_subnets = [module.dtran_vpc.public_subnet_1, module.dtran_vpc.public_subnet_2] 
  vpc_id = module.dtran_vpc.vpc.id
}

module "s3_client" {
  source = "./s3"
}

module "ecs_cluster" {
  source = "./ecs"
  vpc_id = module.dtran_vpc.vpc.id
  subnet_1 = module.dtran_vpc.private_subnet_1
  subnet_2 = module.dtran_vpc.private_subnet_2
  target_group_arn = module.alb.tg_arn
  db_hostname = module.ec2_db_server.instance_ip
}




