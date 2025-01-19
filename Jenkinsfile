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
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm run tests'
            }
        }
    }
}
