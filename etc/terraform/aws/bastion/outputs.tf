output "workstation-external-cidr" {
  value = "${local.workstation-external-cidr}"
}

output "bastion-eip-public-ip" {
  value = "${module.bastion.bastion-eip-public-ip}"
}

output "bastion-eip-public-dns" {
  value = "${module.bastion.bastion-eip-public-dns}"
}

output "ssh-command" {
  value = "ssh -i ./../../key ubuntu@${module.bastion.bastion-eip-public-ip}"
}

output "http-ping" {
  value = "open http://${module.bastion.bastion-eip-public-ip}"
}
