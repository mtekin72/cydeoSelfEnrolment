pipeline {
    agent any
    
    environment {
        BASE_URL = 'https://qa.sep.tdtm.cydeo.com/taws'
        CREDENTIALS = credentials('automation-user-credentials')
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
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
                withEnv(["BASE_URL=${env.BASE_URL}", 
                         "USERNAME=${CREDENTIALS_USR}", 
                         "PASSWORD=${CREDENTIALS_PSW}"]) {
                    sh 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            junit 'results/junit-results.xml'
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
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
