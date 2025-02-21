provider "aws" {
  region                  = var.aws_region
  access_key              = var.aws_access_key_id
  secret_key              = var.aws_secret_access_key
  token                   = var.aws_session_token
}

resource "aws_instance" "web_server" {
  ami                    = "ami-0a313d6098716f372"  # Fedora
  instance_type          = "t3.micro"
  key_name               = "aws-key"
  associate_public_ip_address = true

  tags = {
    Name = "ServidorAcademy"
  }

  user_data = file("${path.module}/../scripts/setup.sh")
}

output "instance_ip" {
  value = aws_instance.web_server.public_ip
}
