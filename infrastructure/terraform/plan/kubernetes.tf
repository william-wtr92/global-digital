resource "scaleway_vpc_private_network" "pn" {
  name       = "${var.project_name}-${var.project_env}-vpc"
  project_id = var.project_id
}

resource "scaleway_k8s_cluster" "cluster" {
  name                = "${var.project_name}-${var.project_env}-cluster"
  version             = "1.29.6"
  cni                 = "cilium"
  private_network_id  = scaleway_vpc_private_network.pn.id
  project_id          = var.project_id
  delete_additional_resources = false
}

resource "scaleway_k8s_pool" "pool" {
  name = "${var.project_name}-${var.project_env}-pool"
  cluster_id = scaleway_k8s_cluster.cluster.id
  node_type = "DEV1-M"
  region = var.region
  size = var.pool_size
  # autohealing = true
  # autoscaling = true
  # min_size = 1
  # max_size = 5
}

resource "local_file" "kubeconfig" {
  content  = scaleway_k8s_cluster.cluster.kubeconfig[0].config_file
  filename = "${path.module}/kubeconfig"
}

output "cluster_url" {
  value = scaleway_k8s_cluster.cluster.apiserver_url
}