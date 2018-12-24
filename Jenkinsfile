pipeline {
    agent any

    environment {
      DOCKER_IMAGE = 'vops'
      REPORT_STAGE = 'etu'
    }

    stages {
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

       stage('Get dockermgeo/vops') {
         steps {
           sh '''
            wdir=/tmp/github-vops/
            if [ -d ${wdir} ]; then
              rm -Rf ${wdir}
            fi
            git clone https://dockermgeo:github2mec@github.com/dockermgeo/vops /tmp/github-vops
            cp -Rvf * ${wdir}/
            cd ${wdir} && git add * && git status
            git commit -m "Released on $(date)" && git push

            rm -Rf ${wdir}
            '''
         }
       }
    }
}
