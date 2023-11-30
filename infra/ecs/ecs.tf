variable "subnet_1" {
  type = string
}

variable "db_hostname" {
  type = string
}

variable "subnet_2" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "container_name" {
  type = string
  default = "ecommerce-server"
}

variable "target_group_arn" {
  type = string
}

resource "aws_security_group" "cluster_sg" {
  vpc_id = var.vpc_id
  name   = "cluster_sg"

  ingress {
    from_port = 0
    to_port   = 65535
    protocol  = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_ecs_cluster" "ecommerce_cluster" {
  name = "EcommerceCluster"
}

data "aws_iam_role" "ecs_execution_role" {
  name = "ecsTaskExecutionRole"
}

resource "aws_ecs_task_definition" "ecommerce_server_task" {
  family                   = "ecommerce-server-task"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  network_mode = "awsvpc"
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }
  container_definitions = jsonencode([{
    name      = var.container_name
    image     = "vietdung13x3/ecommerce-server:prod-aws"
    cpu       = 1024
    memory    = 2048
    essential = true
    portMappings = [
      {
        containerPort = 8080
        hostPort      = 8080
        appProtocol = "http"
        portName = "ecommerce-server-port-8080"
      }
    ]
    environment = [
      { name = "ENVIRONMENT", value = "prod" },
      { name = "CLIENT_DOMAIN_HOST", value = "google.com" },
      { name = "MONGODB_HOST", value = var.db_hostname },
      { name = "RABBITMQ_HOST", value = var.db_hostname },
      { name = "SMTP_HOST", value = var.db_hostname },
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/ecommerce-server"
        "awslogs-region"        = "ap-southeast-2"
        "awslogs-stream-prefix" = "ecs"
        "awslogs-create-group"  = "true"
      }
    }
  }])
  execution_role_arn = data.aws_iam_role.ecs_execution_role.arn
}


resource "aws_ecs_service" "ecommerce_service" {
  name = "ECSEcommerceService"
  cluster = aws_ecs_cluster.ecommerce_cluster.id
  task_definition = aws_ecs_task_definition.ecommerce_server_task.arn
  desired_count = 2
  launch_type = "FARGATE"
  platform_version = "LATEST"
  network_configuration {
    subnets = [ var.subnet_1, var.subnet_2 ]
    security_groups = [ aws_security_group.cluster_sg.id ]
    assign_public_ip = true
  }
  load_balancer {
    container_name = var.container_name
    container_port = 8080
    target_group_arn = var.target_group_arn
  }
}

