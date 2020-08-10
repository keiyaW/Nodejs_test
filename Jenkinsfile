pipeline {
    agent {
        label "dockerworker"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm run serve'
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'mvn test'
        //     }
        //     post {
        //         always {
        //             junit 'target/surefire-reports/*.xml'
        //         }
        //     }
        // }
        stage('Build image') {
            steps {
                sh 'docker build -t my-app .'
            }
        }
        stage('Run app') {
            steps {
                sh 'npm run serve'
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}