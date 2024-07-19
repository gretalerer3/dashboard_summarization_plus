variable "project_id" {
  type = string
  default = "astrafy-sandbox-greta"
}

variable "deployment_region" {
  type = string
  default = "europe-west1"
}

variable "docker_image" {
    type = string
    default = "europe-west1-docker.pkg.dev/astrafy-sandbox-greta/dashboard-summary/dashboard-summary-image:latest"
}

variable "cloud_run_service_name" {
    type = string
    default = "websocket-service"
}
