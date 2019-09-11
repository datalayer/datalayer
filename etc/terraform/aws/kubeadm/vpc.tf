############
## VPC
############

resource "aws_vpc" "kubeadm_vpc" {
  cidr_block = "${var.vpc_cidr}"
  enable_dns_hostnames = true
  tags = "${merge(
    local.common_tags,
    map(
        "Name", "${var.vpc_name}",
        "Owner", "${var.owner}"
    )
  )}"
}

# DHCP Options are not actually required, being identical to the Default Option Set
resource "aws_vpc_dhcp_options" "dns_resolver" {
  domain_name = "${var.region}.compute.internal"
  domain_name_servers = ["AmazonProvidedDNS"]

  tags = "${merge(
    local.common_tags,
    map(
        "Name", "${var.vpc_name}",
        "Owner", "${var.owner}"
    )
  )}"
}

resource "aws_vpc_dhcp_options_association" "dns_resolver" {
  vpc_id ="${aws_vpc.kubeadm_vpc.id}"
  dhcp_options_id = "${aws_vpc_dhcp_options.dns_resolver.id}"
}

##########
# Keypair
##########

resource "aws_key_pair" "default_keypair" {
  key_name = "${var.default_keypair_name}"
  public_key = "${local.default_keypair_public_key}"
}


############
## Subnets
############

# Subnet (public)
resource "aws_subnet" "kubeadm_subnet" {
  vpc_id = "${aws_vpc.kubeadm_vpc.id}"
  cidr_block = "${var.vpc_cidr}"
  availability_zone = "${var.zone}"
  tags = "${merge(
    local.common_tags,
    map(
        "Name", "kubeadm_subnet",
        "Owner", "${var.owner}"
    )
  )}"
}

resource "aws_internet_gateway" "kubeadm_gw" {
  vpc_id = "${aws_vpc.kubeadm_vpc.id}"

  tags = "${merge(
    local.common_tags,
    map(
        "Name", "kubernetes",
        "Owner", "${var.owner}"
    )
  )}"
}

############
## Routing
############

resource "aws_route_table" "kubeadm_rt" {
   vpc_id = "${aws_vpc.kubeadm_vpc.id}"
   # Default route through Internet Gateway
   route {
     cidr_block = "0.0.0.0/0"
     gateway_id = "${aws_internet_gateway.kubeadm_gw.id}"
   }

  tags = "${merge(
    local.common_tags,
    map(
        "Name", "kubernetes",
        "Owner", "${var.owner}"
    )
  )}"
}

resource "aws_route_table_association" "kubeadm_rta" {
  subnet_id = "${aws_subnet.kubeadm_subnet.id}"
  route_table_id = "${aws_route_table.kubeadm_rt.id}"
}


############
## Security
############

resource "aws_security_group" "kubeadm_sg" {
  vpc_id = "${aws_vpc.kubeadm_vpc.id}"
  name = "kubeadm_sg"
  # Allow all outbound
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Allow ICMP from control host IP
  ingress {
    from_port = 8
    to_port = 0
    protocol = "icmp"
    cidr_blocks = ["${var.control_cidr}"]
  }
  # Allow all internal.
  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["${var.vpc_cidr}"]
  }
  # Allow all traffic from the API ELB
//  ingress {
//    from_port = 0
//    to_port = 0
//    protocol = "-1"
//    security_groups = ["${aws_security_group.kubeadm_sg_api.id}"]
//  }

  # Allow all traffic from control host IP
  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["${var.control_cidr}"]
  }
  tags = "${merge(
    local.common_tags,
    map(
        "Name", "kubernetes",
        "Owner", "${var.owner}"
    )
  )}"
}
