pipeline {
    agent none // Ensures no global agent is used
    
    stages {
        stage('Checkout') {
            agent any // Runs on any available node/agent
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent any // Runs on any available node/agent
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            agent any // Runs on any available node/agent
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
            // Ensure to surround the step with the 'node' block for archiveArtifacts
            node('my-agent') {  // Specify the Jenkins agent's label here
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
