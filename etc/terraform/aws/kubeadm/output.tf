############
## Outputs
############

output "kubernetes_controlplane_public_ip" {
  value = "${join(",", aws_instance.controlplane.*.public_ip)}"
}

output "ssh-controlplane-command" {
  value = "ssh -i key ubuntu@${join(",", aws_instance.controlplane.*.public_ip)}"
}

output "kubernetes_workers_public_ip" {
  value = "${join(",", aws_instance.worker.*.public_ip)}"
}

# output "ssh-workers-command" {
#   value = "ssh -i key ubuntu@${join(",", aws_instance.workers.*.public_ip)}"
# }
