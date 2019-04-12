pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Deploy') {
      sh tools/deploy.sh root 192.81.211.75 /var/lib/jenkins/.ssh/id_rsa tiimus-backend tiimus-backend_dev dev
    }
  }
}