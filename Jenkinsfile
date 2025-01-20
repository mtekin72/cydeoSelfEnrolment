pipeline {
    agent none // Use specific agents for each stage

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent any
            steps {
                script {
                    sh 'node -v' // Validate Node.js installation
                    sh 'npm -v'  // Validate npm installation
                    sh 'npm ci'
                    sh 'npx playwright install --with-deps'
                }
            }
        }

        stage('Run Tests') {
            agent any
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
            agent any // Ensure post actions run on any available agent
            steps {
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
