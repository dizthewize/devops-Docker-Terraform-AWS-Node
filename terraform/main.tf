provider "aws" {}

resource "aws_instance" "node-purchase-bot" {
    ami = "ami-07ebfd5b3428b6f4d"
    instance_type = "t2.micro"
    vpc_security_group_ids = ["sg-09bd630a1bcda7fde"]

    tags = {
      Name = var.environment
    }
}
