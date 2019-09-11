variable "project" {}
variable "platform" {}
variable "team" {}
// variable "ssh_public_key" {}
variable "ami" {
  default = "ami-077a5b1762a2dde35"
}
resource "aws_instance" "bastion" {
  ami = "${var.ami}"
  instance_type = "t2.micro"
  tags = {
    Name = "${var.platform}_bastion"
    Project = "${var.project}"
    Platform = "${var.platform}"
    Team = "${var.team}"
  }
  associate_public_ip_address = "true"
  iam_instance_profile = "${aws_iam_instance_profile.test_profile.name}"
  key_name = "${aws_key_pair.key_pair.key_name}"
  vpc_security_group_ids = [
    "${aws_security_group.dmz_sg.id}"
  ]
  subnet_id = "${aws_subnet.public_subnet_1.id}"
#  provisioner "local-exec" {
#    command = "ssh -t ubuntu@$(terraform output bastion-eip-public-ip) 'touch ~/local'"
#  }
  provisioner "remote-exec" {
#    inline = [
#      "touch ~/hello",
#      "sudo apt update; sudo apt install -y awscli jq nginx; sudo systemctl start nginx",
#   ]
    script = "${path.module}/bootstrap.sh"
    connection {
      type = "ssh"
      host = "${aws_instance.bastion.public_ip}"
      user = "ubuntu"
      agent = "false"
      private_key = "${file("${path.module}/../../../key")}"
      timeout = "5m"
    }
  }
}

# resource "aws_eip" "bastion_public_ip" {}

# resource "aws_eip_association" "bastion_public_ip_association" {
#  instance_id = "${aws_instance.bastion.id}"
#  allocation_id = "${aws_eip.bastion_public_ip.id}"
# }

resource "aws_key_pair" "key_pair" {
  key_name = "${var.project}_${var.platform}"
//  public_key = "${var.ssh_public_key}"
  public_key = "${file("${path.module}/../../../key.pub")}"
}
