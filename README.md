# Automated Load Balancing and Auto Scaling for a React Application on AWS

This project sets up an automated, scalable infrastructure for a React application on AWS using Terraform. It includes an Application Load Balancer, Auto Scaling Group, and Launch Template to ensure high availability and performance.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account with appropriate permissions.
- Terraform installed on your local machine.
- SSH access configured for your EC2 instances.
- A private GitHub repository with your React application code.
- A valid SSH key for accessing your GitHub repository.

## Project Overview

This Terraform configuration will:

1. **Provision an Application Load Balancer (ALB)**:
   - Distributes traffic evenly across multiple EC2 instances.
   - Configured with security groups to allow HTTP traffic on port 80.

2. **Configure a Target Group**:
   - Monitors EC2 instances' health using HTTP health checks.

3. **Set Up a Launch Template**:
   - Defines EC2 instance parameters such as AMI, instance type, and security groups.
   - Includes user data scripts for initializing instances and setting up the environment.

4. **Implement an Auto Scaling Group (ASG)**:
   - Uses the Launch Template to automatically scale the number of instances based on application load.
   - Ensures a minimum and maximum number of instances are always running.

5. **Deploy the React Application**:
   - Instances automatically clone the application from a private GitHub repository using SSH keys.
   - Installs Node.js dependencies, builds the React application, and serves it using Nginx.

6. **Ensure Continuous Delivery**:
   - Configured to automatically apply updates from the GitHub repository via webhooks for continuous delivery.

## Setup Instructions

### 1. AWS credentials

After installing the AWS CLI, configure it with your AWS credentials:

```sh
aws configure
```

You'll be prompted to enter your AWS Access Key ID, Secret Access Key, region, and output format. Example:

```sh
AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
Default region name [None]: us-east-1
Default output format [None]: json
```

### 2. Initialize Terraform

First, initialize your Terraform configuration. This step downloads the necessary provider plugins and prepares the working directory.

```sh
terraform init
```

Then terraform plan command creates an execution plan, which lets you preview the changes that Terraform plans to make to your infrastructure.

```sh
terraform plan
```
And terraform apply command executes the actions proposed in a Terraform plan to create, update, or destroy infrastructure.

```sh
terraform apply
```

To destroy the resources created by this Terraform configuration, use the following command:

```sh
terraform destroy
```

## Troubleshooting

If you encounter issues during deployment or while running the application, refer to the following troubleshooting tips:

1. **Terraform Errors**:
   - Ensure Terraform is up to date (`terraform -version`).
   - Check AWS credentials and permissions; make sure they have sufficient rights for the required operations.
   - If you encounter "rate limit exceeded" errors, try again after some time or request a limit increase from AWS.

2. **EC2 Instance Issues**:
   - Verify that the instances are running and healthy in the AWS EC2 dashboard.
   - Check the instance security groups to ensure the correct ports are open (e.g., port 80 for HTTP).
   - SSH into the instance to check logs (`/var/log/cloud-init.log` and `/var/log/nginx/error.log`) for specific errors.

3. **Load Balancer Not Working**:
   - Ensure the ALB is active and correctly associated with the target group.
   - Check that the health checks are correctly configured and that instances are marked as healthy.
   - Confirm that the DNS name provided by the load balancer resolves correctly.

4. **React Application Not Serving**:
   - Make sure Nginx is properly configured and running (`sudo systemctl status nginx`).
   - Verify that the React application has been correctly cloned, dependencies are installed, and the build process completed without errors.
   - Check environment variables and paths in the user data script for any misconfigurations.

5. **Auto Scaling Group Issues**:
   - Ensure the ASG is scaling according to the defined policies and that instances are being added/removed as expected.
   - Review the scaling activities in the AWS console for any failed scaling actions.

6. **GitHub Webhook Not Triggering**:
   - Confirm that the webhook URL is correctly set in the GitHub repository settings.
   - Check the webhook payload delivery status in GitHub for any errors or misconfigurations.

## Useful Links

Here are some helpful links to resources and documentation that can assist you with this project:

- [Terraform Documentation](https://www.terraform.io/docs): Official Terraform documentation and guides.
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html): Comprehensive guide on managing EC2 instances.
- [AWS Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html): Detailed documentation on ALB setup and configuration.
- [Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html): Learn about configuring and managing Auto Scaling Groups in AWS.
- [Nginx Documentation](https://nginx.org/en/docs/): Official Nginx documentation for configuration and troubleshooting.
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks): Guide on setting up and managing GitHub webhooks.
- [Troubleshooting EC2 Instances](https://aws.amazon.com/premiumsupport/knowledge-center/troubleshoot-ec2/): AWS support documentation for common EC2 issues.

These resources should help guide you through setting up, managing, and troubleshooting your application deployment on AWS using Terraform.
