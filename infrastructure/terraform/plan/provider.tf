provider "scaleway" {
  access_key       = var.access_key
  secret_key       = var.secret_key
  project_id       = var.project_id
  organization_id  = var.organization_id
  region           = var.region
  zone             = var.zone
}

