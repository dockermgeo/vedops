#!/usr/bin/env bash



WAIT_SECONDS="1"
SERVER="http://mecy:27080"
LIST_HWUI="HelloWorld-UI/build/9143 HelloWorld-UI/test/9043 HelloWorld-UI/prod/8748 HelloWorld-UI/build/9143"
LIST_HWDB="HelloWorld-DB/build/847 HelloWorld-DB/test/847 HelloWorld-DB/prod/493 HelloWorld-DB/build/892"
LIST_HWAPI="RootKit-R3/build/1 HelloWorld-API/build/6 HelloWorld-API/test/6 HelloWorld-API/prod/6 HelloWorld-API/build/34"
LIST_RKIT="RootKit-R3/build/8 RootKit-R3/test/2"

function inserter() {
  counter=0;
  for entry in ${LIST_ENTRY}; do
    counter=$(($counter+1))
    URL="${SERVER}/api/add/namespace/${entry}"
    echo -e "\n${counter} $Inserting ${entry} - ${URL}"
    #curl -s -X POST http://mecy:27080/api/add/namespace/${DOCKER_IMAGE}/${REPORT_STAGE}/${BUILD_NUMBER}
    curl -X POST ${URL}
    sleep ${WAIT_SECONDS}
  done
}

LIST_ENTRY=$LIST_HWDB
inserter

LIST_ENTRY=$LIST_HWUI
inserter

LIST_ENTRY=$LIST_HWAPI
inserter

LIST_ENTRY=$LIST_RKIT
inserter
