# VOPS

VersionOPS - View build or deployinformation from a Database to a UI.
Gives a REST-API for posting data.


### Docker-Environment
- LOG_LEVEL=debug
- MONGODB_HOST=<mongodb_host>

### API
#### Get a list of versions
- http://<your_host>:<27080>/api

#### Store a version
- http://<your_host>:<27080>/api/add/namespace/appname/stage/version

### Jenkins-LIB

reportVersion.groovy
```
def call() {
    sh '''
        curl -s http://${VOPS_HOST}:${VOPS_HOST:-27080}/api/add/${NAMESPACE}/${DOCKER_IMAGE}/${REPORT_STAGE}/${BUILD_NUMBER}
    '''
}
```
