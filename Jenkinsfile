pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vops'
      REPORT_STAGE = 'etu'
    }

    stages {
        stage('Build VOPS') {
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
         steps {
           sh '''
             docker pull mongo
             docker tag mongo dockermgeo/mongo:latest
             docker push dockermgeo/mongo:latest
           '''
         }
       }

       stage('Promote GIThub') {
         environment {
           def REPORT_STAGE='satu'
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
