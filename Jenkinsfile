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
                script {
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: '*/main']], // Asegurar que usa main
                        userRemoteConfigs: [[
                            url: 'https://github.com/Alejandro-Polo/Proyecto-LDAP.git',
                            credentialsId: 'CREDENTIALS_GITHUB_TEST' // Asegurar que Jenkins use las credenciales
                        ]]
                    ])
                }
            }
        }
    }

        stage('Terraform Init') {
            steps {
                sh 'terraform init'
            }
        }

        stage('Terraform Apply') {
            steps {
                sh 'terraform apply -auto-approve'
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
