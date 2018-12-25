pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vedops'
      REPORT_STAGE = 'build'
      BUILD_RELEASE_NUMBER = 1
    }

    stages {
        stage('Build Dockerimage') {
            steps {
               dockerBuild()
            }
       }

        stage('Buildreporter & Nextwait') {
            steps {
               reportVersion()
               input id: 'ok-test', message: 'Waiting for userinput'
            }
       }

       stage('DockerHubpublishing & Nextwait') {
         environment {
           def REPORT_STAGE='test'
         }
         steps {
           dockerHubPush()
           reportVersion()
           input id: 'ok-prod', message: 'Waiting for userinput'
         }
       }

       stage('Promote GitHub') {
         environment {
           def REPORT_STAGE='prod'
         }
         steps {
           sh '''
            make -f Makefile.github
            '''
            reportVersion()
         }
       }
    }
}
