############################
# K8s Control Pane instances
############################

resource "aws_instance" "controlplane" {
  count = 1
  ami = "${lookup(var.amis, var.region)}"
  instance_type = "${var.controller_instance_type}"
  iam_instance_profile = "${aws_iam_instance_profile.kubeadm_profile.id}"
  user_data = "${data.template_file.master-userdata.rendered}"
  subnet_id = "${aws_subnet.kubeadm_subnet.id}"
#    private_ip = "10.43.0.40"
  associate_public_ip_address = true # Instances have public, dynamic IP
  source_dest_check = false # TODO Required??
  availability_zone = "${var.zone}"
  vpc_security_group_ids = ["${aws_security_group.kubeadm_sg.id}"]
  key_name = "${var.default_keypair_name}"
  tags = "${merge(
  local.common_tags,
    map(
      "Owner", "${var.owner}",
      "Name", "kubeadm-controlplane-${count.index}"
    )
  )}"
}
