provider "aws" {
  region = "eu-west-2"
}

data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

module "bastion" {
  source                             = "./bastion"
  project                            = "${var.project}"
  platform                           = "${terraform.workspace}"
  team                               = "${var.team}"
//  ssh_public_key                     = "${var.ssh_public_key}"
  ami                                = "ami-077a5b1762a2dde35"
  cidr_blocks_allowed_to_ssh_bastion = [
    "${chomp(data.http.workstation-external-ip.body)}/32"
  ]
  cidr_blocks_allowed_to_http_bastion = [
    "${chomp(data.http.workstation-external-ip.body)}/32"
  ]
}
