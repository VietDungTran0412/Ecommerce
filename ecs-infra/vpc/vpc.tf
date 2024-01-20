variable "public_subnet_props" {
  type = list(object({
    name       = string,
    az         = string
    cidr_block = string
  }))
  default = [
    {
      name       = "dtran-public-subnet-1"
      az         = "ap-southeast-2a"
      cidr_block = "10.0.1.0/24"
    },
    {
      name       = "dtran-public-subnet-2"
      az         = "ap-southeast-2b"
      cidr_block = "10.0.2.0/24"
  }]
}

variable "private_subnet_props" {
  type = list(object({
    name       = string,
    az         = string
    cidr_block = string
  }))
  default = [
    {
      name       = "dtran-private-subnet-1"
      az         = "ap-southeast-2a"
      cidr_block = "10.0.3.0/24"
    },
    {
      name       = "dtran-private-subnet-2"
      az         = "ap-southeast-2b"
      cidr_block = "10.0.4.0/24"
  }]

}

# Provision Internet Gateway
resource "aws_internet_gateway" "dtran_igw" {
  vpc_id = aws_vpc.dtran_vpc.id
  tags = {
    Name = "dtran-igw"
  }
}

# Provision VPC
resource "aws_vpc" "dtran_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  instance_tenancy     = "default"
  tags = {
    Name = "DTranVPC"
  }
}

# Provision subnets in 4 azs for high availability
resource "aws_subnet" "public_subnets" {
  count             = length(var.public_subnet_props)
  vpc_id            = aws_vpc.dtran_vpc.id
  availability_zone = var.public_subnet_props[count.index].az
  cidr_block        = var.public_subnet_props[count.index].cidr_block
  tags = {
    Name = var.public_subnet_props[count.index].name
  }
}

# Provision subnets in 4 azs for high availability
resource "aws_subnet" "private_subnets" {
  count             = length(var.private_subnet_props)
  vpc_id            = aws_vpc.dtran_vpc.id
  availability_zone = var.private_subnet_props[count.index].az
  cidr_block        = var.private_subnet_props[count.index].cidr_block
  tags = {
    Name = var.private_subnet_props[count.index].name
  }
}

# Provision public rtb
resource "aws_route_table" "public_rtb" {
  vpc_id = aws_vpc.dtran_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.dtran_igw.id
  }
  tags = {
    Name = "public-rtb"
  }
}

# Provision private rtb
resource "aws_route_table" "private_rtb" {
  vpc_id = aws_vpc.dtran_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.nat_gw.id
  }
  tags = {
    Name = "private-rtb"
  }
}

# Edit subnet association
resource "aws_route_table_association" "public_subnet_association" {
  count = length(aws_subnet.public_subnets)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_rtb.id
}

resource "aws_route_table_association" "private_subnet_association" {
  count = length(aws_subnet.private_subnets)
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private_rtb.id
  depends_on = [ aws_nat_gateway.nat_gw ]
}

resource "aws_eip" "eip" {
  domain = "vpc"
  tags = {
    Name = "nat-gw-eip"
  }
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.eip.id
  subnet_id = aws_subnet.public_subnets[0].id

  tags = {
    Name = "dtran-nat-gw"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.dtran_igw]
}

output "vpc" {
  value = aws_vpc.dtran_vpc
}

output "public_subnet_1" {
  value = aws_subnet.public_subnets[0].id
}

output "public_subnet_2" {
  value = aws_subnet.public_subnets[1].id
}

output "private_subnet_1" {
  value = aws_subnet.private_subnets[0].id
}

output "private_subnet_2" {
  value = aws_subnet.private_subnets[1].id
}

