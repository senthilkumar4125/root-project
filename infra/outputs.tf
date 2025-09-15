output "alb_dns_name" {
  value = aws_lb.alb.dns_name
  description = "ALB DNS to access the app"
}

output "ecr_repo_url" {
  value = aws_ecr_repository.app.repository_url
  description = "ECR repository URL"
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}
