# Infrastructure as Code: Provisioning the OVERLORD Production Environment
provider "aws" {
  region = "us-east-1"
}

# 1. S3 Bucket for the "Vault" (Asset Storage)
resource "aws_s3_bucket" "asset_vault" {
  bucket = "overlord-asset-vault-prod"
}

resource "aws_s3_bucket_public_access_block" "vault_access" {
  bucket = aws_s3_bucket.asset_vault.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 2. RDS Instance for PostgreSQL (Database Schema)
resource "aws_db_instance" "overlord_db" {
  allocated_storage    = 50
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.large"
  db_name              = "overlord_production"
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  multi_az             = true
  storage_encrypted    = true
}

# 3. ElastiCache Redis for Task Queue (Celery)
resource "aws_elasticache_cluster" "task_queue" {
  cluster_id           = "overlord-queue"
  engine               = "redis"
  node_type            = "cache.t3.medium"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}