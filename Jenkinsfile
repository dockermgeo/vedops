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

        stage('Deploy & Nextwait') {
         environment {
           def DEPLOY_NAME='vedops'
           def INPUT_ID='DeployBuild'
         }
         steps {
            //cycling cant report after that
            dockerDeploy()
            inputProceed()
            input id: 'DeployBuild', message: 'waiting for callback'
            reportVersion()
         }
       }

       stage('Imagepublish & Nextwait') {
         environment {
           def REPORT_STAGE='test'
           def INPUT_ID='PublishGit'
         }
         steps {
           dockerHubPush()
           inputProceed()
           input id: 'PublishGit', message: 'waiting for callback'
           reportVersion()
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
