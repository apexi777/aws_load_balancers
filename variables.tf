#-----------------------------------------------------------
# Account
#-----------------------------------------------------------
variable "region" {
  description = "AWS region"
  default     = "us-east-1" # N. Virginia
}

variable "aws_pforile" {
  default = "terraform_cli"
}

variable "common_tags" {
  type = map(any)
  default = {
    Project     = "Practice AWS"
    Owner       = "Babich Andrey"
    Environment = "Development"
    CreatedBy = "Terraform"
  }
}

#-----------------------------------------------------------
# Routing
#-----------------------------------------------------------
variable "vpc_cidr" {
  description = "VPC CIDR block"
  default     = "10.0.0.0/16"
}

variable "subnet_one" {
  description = "Subnet CIDR block"
  default     = "10.0.1.0/24"
}

variable "subnet_two" {
  description = "Subnet CIDR block"
  default     = "10.0.2.0/24"
}

variable "cidr_block_all" {
  description = "Any address"
  default = "0.0.0.0/0"
}

variable "my_ip" {
  default = "91.201.242.66/32"
}

#-----------------------------------------------------------
# Security
#-----------------------------------------------------------

variable "allow_ports" {
  description = "List of ports to open for server"
  type        = list(number)
  default     = ["80", "443"]
}



#-----------------------------------------------------------
# Instances
#-----------------------------------------------------------

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}


