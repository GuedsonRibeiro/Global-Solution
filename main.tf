# PROVIDER
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# REGION
provider "aws" {
    region = "us-east-1"
    shared_credentials_file = ".aws/credentials"
}

# BUCKET S3
resource "aws_s3_bucket" "s3-bucket-guedson2" {
  bucket = "s3-bucket-guedson2"
}

# STATIC SITE
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.s3-bucket-guedson2.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_object" "index" {
  key = "index.html"
  bucket = aws_s3_bucket.s3-bucket-guedson2.id
  source = "index.html"
  content_type = "text/html"
}

resource "aws_s3_bucket_object" "script" {
  key = "script.js"
  bucket = aws_s3_bucket.s3-bucket-guedson2.id
  source = "script.js"
  content_type = "text/js"
}

resource "aws_s3_bucket_object" "site_css" {
  key = "site.css"
  bucket = aws_s3_bucket.s3-bucket-guedson2.id
  source = "site.css"
  content_type = "text/css"
}

# VERSIONING S3 BUCKET
resource "aws_s3_bucket_versioning" "version" {
  bucket = aws_s3_bucket.s3-bucket-guedson2.id
  versioning_configuration {
    status = "Enabled"
  }
}