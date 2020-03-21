def app_name
def app_ver
def replaceAppHelmDeploy(String app_name,String app_ver){
        
        app_image = app_name+':'+ app_ver
        sh "sed -i s/APP_NAME/${app_name}/g npm-deploy/values.yaml"
        sh "sed -i s/NAMESPACE/cicd/g npm-deploy/values.yaml"
        sh "sed -i s/DOCKER_SERVER/${DOCKER_SERVER}/g npm-deploy/values.yaml"
        sh "sed -i 's/APP_IMAGE/${app_image}/g' npm-deploy/values.yaml"
        sh "sed -i s/HOSTNAME/${app_name}/g npm-deploy/values.yaml"
        sh "sed -i s/REPLICAS/1/g npm-deploy/values.yaml"
}

def deployHelmChart(String app_name){
sh "helm upgrade --install ${app_name} npm-deploy"
}

def connectGke(){
sh "gcloud container clusters get-credentials techforce-cicd --zone asia-south1-b --project techforce-181305"        
}

pipeline {
  agent any
  stages {
    stage('Build Image') {
      steps {
        // Capture the values w.r.t application
              script {
        def pkg = readJSON file: 'package.json'
        app_name = pkg.name.toString().toLowerCase()
        app_ver  = pkg.version             
        sh "sudo docker build -t $DOCKER_SERVER/$app_name:$app_ver ."
              }
      }
    }
    stage('Push Image') {
      steps {
        sh "sudo docker login $DOCKER_SERVER -u=$DOCKER_USERNAME -p=$DOCKER_PASSWORD"
        sh "sudo docker push $DOCKER_SERVER/$app_name:$app_ver"
      }
    }
    stage('Deploy') {
      steps {
        // Replace the values in the values.yaml   
        connectGke()      
        replaceAppHelmDeploy("$app_name","$app_ver")
        deployHelmChart("$app_name")
        
      }
    }
  }
  environment {
    DOCKER_SERVER = credentials('DOCKER_SERVER')
    DOCKER_USERNAME = credentials('DOCKER_USERNAME')
    DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
  }
}
