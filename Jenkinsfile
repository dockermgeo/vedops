pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vops'
      REPORT_STAGE = 'etu'
    }

    stages {
        stage('GIThub') {
          steps {
            sh '''
             wdir=/tmp/github-vops2/
             if [ -d ${wdir} ]; then
               rm -Rf ${wdir}
             fi
             make -f Makefile.github
             '''
          }
        }

        stage('Build') {
            steps {
               dockerBuild()
            }
       }

        stage('Report') {
            steps {
               reportVersion()
            }
       }

       stage('Get Mongo') {
         steps {
           sh '''
             docker pull mongo
             docker tag mongo dockermgeo/mongo:latest
             docker push dockermgeo/mongo:latest
           '''
         }
       }


    }
}
