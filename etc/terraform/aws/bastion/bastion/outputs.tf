output "bastion-eip-public-ip" {
#  value = "${aws_eip.bastion_public_ip.public_ip}"
  value = "${aws_instance.bastion.public_ip}"
}

output "bastion-eip-public-dns" {
#  value = "${aws_eip.bastion_public_ip.public_dns}"
  value = "${aws_instance.bastion.public_dns}"
}
