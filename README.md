# Demo AWS DevOps: Jenkins + Docker + Terraform + ECS (Fargate)

This repo demonstrates a basic CI/CD pipeline:
- App (Node.js) containerized with Docker
- Terraform for infra (ECR, VPC, ALB, ECS Fargate)
- Jenkins pipeline to build, push, and trigger deployment.

See infra/ for Terraform code, app/ for the app, and Jenkinsfile for the pipeline.

Quick start:
1. `cd infra` → `terraform init && terraform apply -auto-approve`
2. Build & push app image or configure Jenkins to build & push
3. `aws ecs update-service --cluster demo-app-cluster --service demo-app-service --force-new-deployment`

Notes:
- Default AWS region is `ap-south-1` (Mumbai). Change in infra/variables.tf if needed.
- Terraform uses local tfstate here. For teams, configure S3 backend and DynamoDB locking.
- use mumbai (default region )
- demo video will be release in youtube
