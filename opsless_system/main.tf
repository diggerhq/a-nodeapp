terraform {
  required_version = ">= 1.0.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  # You can also specify credentials if needed, e.g.:
  # credentials = file("path/to/service_account_key.json")

  # Replace these with your actual project/region or pass them via variables
  project = var.project_id
  region  = var.region
}

# Ensure the Cloud Storage API is enabled
resource "google_project_service" "storage_api" {
  project = var.project_id
  service = "storage.googleapis.com"
}

resource "google_storage_bucket" "terraform_state" {
  name                        = var.bucket_name
  location                    = var.region
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  # If you want Terraform to be able to delete a non-empty bucket,
  # set force_destroy to true. Otherwise, it must be empty before deletion.
  force_destroy = false
}

output "bucket_name" {
  description = "Name of the GCS bucket for Terraform remote state."
  value       = google_storage_bucket.terraform_state.name
}