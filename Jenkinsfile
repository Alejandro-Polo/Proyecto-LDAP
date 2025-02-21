pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')  
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')  
        AWS_SESSION_TOKEN     = credentials('aws-session-token')  
        AWS_DEFAULT_REGION    = 'us-east-1'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Alejandro-Polo/Proyecto-LDAP.git'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Deploy Docker') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i ~/.ssh/aws-key.pem ec2-user@$(terraform output instance_ip) << EOF
                cd /home/ec2-user/Proyecto-LDAP/docker
                docker-compose up -d
                EOF
                '''
            }
        }
    }
}
