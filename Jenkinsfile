pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vops'
      REPORT_STAGE = 'etu'
    }

    stages {
        stage('Build Vedeps') {
            steps {
               dockerBuild()
            }
       }

        stage('Report Vops') {
            steps {
               reportVersion()
            }
       }

       stage('Build MongoDB') {
         environment {
           def REPORT_STAGE='itu'
         }
         steps {
           input id: 'ok-itu', message: 'Waiting for userinput'
           sh '''
             docker pull mongo
             docker tag mongo dockermgeo/mongo:latest
             docker push dockermgeo/mongo:latest
           '''
           reportVersion()
         }
       }

       stage('Promote GIThub') {
         environment {
           def REPORT_STAGE='satu'
         }
         steps {
           input id: 'ok-satu', message: 'Waiting for userinput'
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
