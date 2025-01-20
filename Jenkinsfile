pipeline {
    agent any

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

        stage('Debug Credentials') {
            steps {
                script {
                    echo "USERNAME: ${env.USERNAME}"
                    echo "PASSWORD: [REDACTED]" // Never log passwords directly
                }
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
            node { // Ensure this step is inside a node block
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            }
        }
        failure {
            echo 'Tests failed. Please check the test results.'
        }
        success {
            echo 'All tests passed successfully!'
        }
    }
}
