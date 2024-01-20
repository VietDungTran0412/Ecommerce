variable "s3_bucket_name" {
  type        = string
  description = "s3 bucket name"
}

variable "s3_bucket_frontend_hosting" {}

data "aws_iam_policy_document" "allow_public_read_and_put_access" {
  statement {
    principals {
      identifiers = ["*"]
      type        = "*"
    }

    actions = [
      "s3:GetObject",
      "s3:PutObject"
    ]

    resources = [
      "${module.ecommerce_s3_bucket.s3_bucket_arn}/*",
    ]
  }
}

module "ecommerce_s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  bucket = var.s3_bucket_name
  force_destroy = true
  block_public_policy = false
  policy = data.aws_iam_policy_document.allow_public_read_and_put_access.json
  versioning = {
    enabled = true
  }
}

resource "aws_s3_bucket" "frontend_hosting" {
  bucket = var.s3_bucket_frontend_hosting
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "public_bucket" {
  bucket = aws_s3_bucket.frontend_hosting.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "allow_public_read_access_frontend_hosting" {
  statement {
    principals {
      identifiers = ["*"]
      type        = "*"
    }

    actions = [
      "s3:GetObject",
      "s3:PutObject"
    ]

    resources = [
      "${aws_s3_bucket.frontend_hosting.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "allow_public_read_access" {
  bucket = aws_s3_bucket.frontend_hosting.id
  policy = data.aws_iam_policy_document.allow_public_read_access_frontend_hosting.json
}


resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.frontend_hosting.id

  index_document {
    suffix = "index.html"
  }
}
