variable "vpc_id" {
  type = string
}

data "aws_ami" "t2micro" {
  most_recent = true

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["al2023-ami-2023.2.2023*"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

data "aws_subnet" "public_subnet_1" {
  vpc_id     = var.vpc_id
  cidr_block = "10.0.1.0/24"
}

resource "aws_security_group" "db_sg" {
  vpc_id = var.vpc_id
  name   = "db-sg"

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
  }
}

resource "aws_instance" "db_server" {
  ami                         = data.aws_ami.t2micro.id
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  subnet_id                   = data.aws_subnet.public_subnet_1.id
  vpc_security_group_ids = [ aws_security_group.db_sg.id ]
  user_data = file("./ec2/user-data.sh")
  tags = {
    Name = "DBServer"
  }
  depends_on = [aws_security_group.db_sg]
}


output "instance_ip" {
  value = aws_instance.db_server.private_ip
}