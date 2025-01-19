pipeline {
    agent any
    
    environment {
        BASE_URL = 'https://qa.sep.tdtm.cydeo.com/taws'
        USERNAME = 'automation-user'
        PASSWORD = '123abc'
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
                sh 'npm install'
                sh 'npx playwright install'
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
                        sh 'npm run tests'
                    }
                }
            }
            
            post {
                always {
                    junit 'test-results/**/*.xml'
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
