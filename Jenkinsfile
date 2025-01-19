pipeline {
    agent any
    
    environment {
        BASE_URL = 'https://qa.sep.tdtm.cydeo.com/taws'
        USERNAME = 'automation-user'
        PASSWORD = '123abc'
    }
    
    tools {
        nodejs 'NodeJS'  // Ensure this matches your Jenkins NodeJS tool configuration
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
                sh 'npx playwright install'  // Install Playwright browsers
            }
        }
        
        stage('Run Tests') {
            steps {
                withEnv(["BASE_URL=${env.BASE_URL}", "USERNAME=${env.USERNAME}", "PASSWORD=${env.PASSWORD}"]) {
                    sh 'npm run test:specific'  // Adjust this to your desired test command
                }
            }
            
            post {
                always {
                    junit '**/test-results/**/*.xml'  // Adjust path if necessary
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        failure {
            echo 'Tests failed. Please check the test results.'
        }
        success {
            echo 'All tests passed successfully!'
        }
    }
}
