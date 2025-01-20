pipeline {
    agent any
    
    environment {
        BASE_URL = 'https://qa.sep.tdtm.cydeo.com/taws'
        USERNAME = credentials('automation-user-username')
        PASSWORD = credentials('automation-user-password')
    }
    
    tools {
        nodejs 'NodeJS'
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
            post {
                always {
                    // Ensure the JUnit results file exists
                    junit 'results/junit-results.xml'
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ])
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed. Please check the test results.'
        }
        success {
            echo 'All tests passed successfully!'
        }
    }
}
