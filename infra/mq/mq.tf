resource "aws_mq_broker" "ecommerce_broker" {
  broker_name = "ecomm-broker"
  deployment_mode = "SINGLE_INSTANCE"

  engine_type        = "RabbitMQ"
  engine_version     = "3.11.20"
  host_instance_type = "mq.t3.micro"

  user {
    username = "EcommerceQ123"
    password = "EcommercePasswordQ1303"
  }
}

output "broker_id" {
  value = aws_mq_broker.ecommerce_broker.id
}