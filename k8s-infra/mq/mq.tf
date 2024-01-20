variable "subnet_ids" {
  type = list(string)
  description = "subnet ids of vpc"
}

variable "vpc_id" {
  type = string
  description = "vpc id"
}

locals {
  username = base64decode("RWNvbW1lcmNlUTEyMw==")
  password = base64decode("RWNvbW1lcmNlUGFzc3dvcmRRMTMwMw==")
}

resource "aws_security_group" "rabbitmq_security_group" {
  name        = "rabbitmq-security-group"
  description = "Security group for RabbitMQ in Amazon MQ"
  vpc_id = var.vpc_id

  ingress {
    from_port = 5671 # RabbitMQ default port
    to_port   = 5671
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Adjust this based on your network setup, restrict to specific IPs if possible
  }

  ingress {
    from_port = 15672 # RabbitMQ Management plugin port
    to_port   = 15672
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Adjust this based on your network setup, restrict to specific IPs if possible
  }

  # Add more ingress rules as needed for your specific use case

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # You can add tags if necessary
  tags = {
    Name = "rabbitmq-security-group"
  }
}

resource "aws_mq_broker" "ecommerce-broker" {
  broker_name        = "ecommerce-broker"
  deployment_mode = "SINGLE_INSTANCE"
  engine_type        = "RabbitMQ"
  engine_version     = "3.11.20"
  host_instance_type = "mq.t3.micro"

  user {
    username = local.username
    password = local.password
  }
  subnet_ids = [var.subnet_ids[0]]
  security_groups = [aws_security_group.rabbitmq_security_group.id]
  tags = {
    Provision = "Terraform"
    App = "Ecommerce"
  }
}