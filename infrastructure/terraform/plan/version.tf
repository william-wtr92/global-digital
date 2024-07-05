terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
  required_providers {
    scaleway = {
      source = "scaleway/scaleway"
    }
  }
  required_version = ">= 0.13"
}

