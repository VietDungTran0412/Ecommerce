variable "public_subnets" {
  type = list
}

variable "vpc_id" {
  type = string
}

resource "aws_lb" "ecs_ecomm_alb" {
  name = "ecs-ecommerce-alb"
  internal = false
  load_balancer_type = "application"
  subnets = [ for subnet in var.public_subnets : subnet] 
}

resource "aws_lb_target_group" "ecomm_tg" {
  name = "ecomm-server-tg"
  port = 8080
  vpc_id = var.vpc_id
  protocol = "HTTP"
  target_type = "ip"
  health_check {
    path = "/public/api/healthcheck"
    protocol = "HTTP"
    interval = 15
  }
}

resource "aws_lb_listener" "ecomm_listener" {
  port = 8080
  load_balancer_arn = aws_lb.ecs_ecomm_alb.arn
  protocol = "HTTP"
  default_action {
    target_group_arn = aws_lb_target_group.ecomm_tg.arn
    type = "forward"
  }
}

output "tg_arn" {
  value = aws_lb_target_group.ecomm_tg.arn
}