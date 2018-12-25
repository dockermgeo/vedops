pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vedops'
      REPORT_STAGE = 'build'
      BUILD_RELEASE_NUMBER = 1
    }

    stages {
        stage('Build Vedeps') {
            steps {
               dockerBuild()
            }
       }

        stage('Report Build & Wait') {
            steps {
               reportVersion()
               input id: 'ok-test', message: 'Waiting for userinput'
            }
       }

       stage('Publish DockerHub & Wati') {
         environment {
           def REPORT_STAGE='test'
         }
         steps {
           dockerHubPush()
           reportVersion()
           input id: 'ok-prod', message: 'Waiting for userinput'
         }
       }

       stage('Promote GIThub') {
         environment {
           def REPORT_STAGE='prod'
         }
         steps {
           sh '''
            wdir=/tmp/github-vops2/
            if [ -d ${wdir} ]; then
              rm -Rf ${wdir}
            fi
            make -f Makefile.github
            '''
            reportVersion()
         }
       }
    }
}
