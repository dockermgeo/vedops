# ![LOGO](docs/logo32.png) Vedops

---
- build: v1.47 - updated: 2018-12-25T17:31:08+0000
---


Vedops, or with other words: **Versioning DevOps**. This app serve a API to commit version of build- or deployinformation to a mongodb-Databasesystem in the backend.

The Frontend gives you a overview about your build/deployments etc. The UI support untils to 5 stages.

![Pipeline reporting](docs/pipeline-reporting.png)

A Screenshot of the Frontend will printed at the bottom of this document.

### Composition with docker
```
vedops:
  image: dockermgeo/vedops:latest
  ports:
    - "27080:3200"
  environment:
    - MONGODB_HOST={MONGODB_HOST}
mongo:
  image: mongo
  ports:
    - "27017:27017"
  environment:
    - MONGODB_ROOT_PASSWORD=password123
```

### Environment
##### Needed
- MONGODB_HOST=**{MONGODB_HOST}**

##### Optional
- LOG_LEVEL=**{INFO|DEBUG|ERROR}**
- MONGODB_PORT=**{MONGODB_PORT}**
- MONGODB_USER=**{MONGODB_USER}**
- MONGODB_PASSWORD=**{MONGODB_PASSWORD}**


### API
#### Get a list of versions
- http://**{HOST}**:<27080>/api

#### Store a version
- http://**{HOST}**:<27080>/api/add/**{NAMESPACE}**/**{APPNAME}**/**{STAGE}**/**{VERSION}**

### Jenkins-LIB

#### reportVersion.groovy
```
def call() {
    sh '''
        curl -s -X POST http://mecy:27080/api/add/namespace/${DOCKER_IMAGE}/${REPORT_STAGE}/${BUILD_NUMBER}
    '''
}
```
#### Controll with Jenkinsfile
```
environment {
  def REPORT_STAGE='build'
}
...
stage('DEPLOY_TEST') {
  environment {
    def REPORT_STAGE='test'
  }
  steps {
    reportVersion()
  }
}
```

## APP-Screenshot

---

![Screenshot](docs/webview.png)

---
