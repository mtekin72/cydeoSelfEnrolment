pipeline {
    agent any // This ensures the pipeline runs on any available agent

    environment {
        BASE_URL = 'https://qa.sep.tdtm.cydeo.com/taws'
        USERNAME = credentials('automation-user-username')
        PASSWORD = credentials('automation-user-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    withEnv([
                        "BASE_URL=${env.BASE_URL}",
                        "USERNAME=${env.USERNAME}",
                        "PASSWORD=${env.PASSWORD}"
                    ]) {
                        sh 'npx playwright test'
                    }
                }
            }
        }
    }

    post {
        always {
            // Ensure "label" is not required
            agent any // Add this for post-build actions if node fails
            archiveArtifacts artifacts: 'playwright
