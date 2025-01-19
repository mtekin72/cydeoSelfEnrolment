pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Use the name you configured in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install' 
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm run test:specific'
            }
        }
    }
}
