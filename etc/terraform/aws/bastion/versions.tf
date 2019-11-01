terraform {
  required_version = ">= 0.12.5"
  required_providers {
    aws = ">= 2.7.0"
  }
/*
  backend "s3" {
    bucket               = "tf-state-tut"
    workspace_key_prefix = "terraform-states"
    encrypt              = "true"
    region               = "eu-west-2"
  }
*/
}
