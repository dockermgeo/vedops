pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vedops'
      REPORT_STAGE = 'dev'
      BUILD_RELEASE_NUMBER = 1
    }

    stages {
        stage('Build Dockerimage') {
            steps {
               dockerBuild()
               reportVersion()
            }
        }

        stage('Deploy') {
         environment {
           def DEPLOY_NAME='vedops'
           def INPUT_ID='DeployBuild'
           def SLEEP_TIME=5
           def APP_URL='https://vedops.mgeo.goip.de'
           def REPORT_STAGE='dockerhub'
         }
         steps {
            //cycling cant report after that
            dockerDeploy()
            dockerDeployCheck()
            //inputProceed()
            input id: 'DeployBuild', message: 'waiting for callback'
            reportVersion()
         }
       }

       stage('Publish & Wait') {
         environment {
           def INPUT_ID='PublishGit'
         }
         steps {
           dockerHubPush()
           //inputProceed()
           //input id: 'PublishGit', message: 'waiting for callback'
         }
       }

       stage('Promote sources') {
         environment {
           def REPORT_STAGE='github'
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
