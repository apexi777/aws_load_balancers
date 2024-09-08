#----------------------------------------------------------
# Made by Babich Andrey
#-----------------------------------------------------------

provider "aws" {
  region  = var.region # N. Virginia
  profile = var.aws_pforile

  default_tags {
    tags = var.common_tags
  }
}

#-----------------------------------------------------------
# Routing
#-----------------------------------------------------------

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
}

resource "aws_subnet" "subnet_yellow" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_one
  availability_zone = data.aws_availability_zones.working.names[0] 
}

resource "aws_subnet" "subnet_red" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_two
  availability_zone = data.aws_availability_zones.working.names[1] 
}

resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = var.cidr_block_all
    gateway_id = aws_internet_gateway.gateway.id
  }
}

resource "aws_route_table_association" "subnet_yellow_association" {
  subnet_id      = aws_subnet.subnet_yellow.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "subnet_red_association" {
  subnet_id      = aws_subnet.subnet_red.id
  route_table_id = aws_route_table.route_table.id
}

#-----------------------------------------------------------
# Security
#-----------------------------------------------------------

resource "aws_security_group" "group_from_elb" {
  name   = "elb-security-group"
  vpc_id = aws_vpc.main.id
  tags = merge(var.common_tags, {
    Name = "security_group_from_elb"
  })

  dynamic "ingress" {
    for_each = var.allow_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = [var.cidr_block_all]
    }
  }

  ingress {
    description = "Accept connecting only from my address"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.cidr_block_all]
  }
}

#-----------------------------------------------------------
# Application Load Balancer
#-----------------------------------------------------------
resource "aws_lb" "application_lb" {
  name               = "app-elb"
  // internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.group_from_elb.id]
  subnets            = [aws_subnet.subnet_yellow.id, aws_subnet.subnet_red.id]

  tags = merge(var.common_tags, {
    Name = "Application Load Balancer"
  })
}

# Target Group
resource "aws_lb_target_group" "app_tg" {
  name        = "app-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

# Listener
resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.application_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

#-----------------------------------------------------------
# Launch Template
#-----------------------------------------------------------

resource "aws_launch_template" "web_app_template" {
  name_prefix   = "web-app-"
  image_id               = data.aws_ami.amazon_linux.id
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.group_from_elb.id]
  user_data              = filebase64("${path.module}/user_data.sh")
}

#-----------------------------------------------------------
# Auto Scaling Group
#-----------------------------------------------------------

resource "aws_autoscaling_group" "web" {
  name                = "WebServer-ASG"
  min_size            = 2
  max_size            = 2
  desired_capacity    = 2
  health_check_type   = "ELB"
  health_check_grace_period = 300
  vpc_zone_identifier  = [aws_subnet.subnet_yellow.id, aws_subnet.subnet_red.id]
  target_group_arns   = [aws_lb_target_group.app_tg.arn]

  launch_template {
    id      = aws_launch_template.web_app_template.id
    version = aws_launch_template.web_app_template.latest_version
  }

  dynamic "tag" {
    for_each = {
      Name   = "WebServer in ASG-v${aws_launch_template.web_app_template.latest_version}"
      TAGKEY = "TAGVALUE"
    }
    content {
      key                 = tag.key
      value               = tag.value
      propagate_at_launch = true
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}