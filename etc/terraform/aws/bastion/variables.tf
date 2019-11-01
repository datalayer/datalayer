variable "team" {
  default = "dla-team"
}

variable "project" {
  default = "dla-prj"
}

# Override with variable or hardcoded value if necessary.
locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
/*
variable "ssh_public_key" {
  default = ""
}
*/
