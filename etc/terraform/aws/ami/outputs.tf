output "centos-ami" {
  value = "${data.aws_ami.centos.id}"
}
output "rhel-ami" {
  value = "${data.aws_ami.rhel.id}"
}

output "ubuntu-ami" {
  value = "${data.aws_ami.ubuntu.id}"
}
