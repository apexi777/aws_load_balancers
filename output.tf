output "web_loadbalancer_url" {
  value = aws_lb.application_lb.dns_name
}