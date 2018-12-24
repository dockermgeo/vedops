# VOPS

VersionOPS - View build or deployinformation from a Database to a UI.
Gives a REST-API for posting data.


### Docker-Environment
- LOG_LEVEL=debug
- MONGODB_HOST=**{MONGODB_HOST}**

### API
#### Get a list of versions
- http://**{HOST}**:<27080>/api

#### Store a version
- http://**{HOST}**:<27080>/api/add/**{NAMESPACE}**/**{APPNAME}**/**{STAGE}**/**{VERSION}**

### Jenkins-LIB

reportVersion.groovy
```
def call() {
    sh '''
        curl -s http://${VOPS_HOST}:${VOPS_HOST:-27080}/api/add/${NAMESPACE}/${DOCKER_IMAGE}/${REPORT_STAGE}/${BUILD_NUMBER}
    '''
}
```


## Screenshots
![Screenshot](docs/webview.png)
