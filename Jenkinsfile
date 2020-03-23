def app_name
def app_ver
def replaceAppHelmDeploy(String app_name,String app_ver){
        
        app_image = app_name+':'+ app_ver
        sh "sed -i s/APP_NAME/${app_name}/g npm-deploy/values.yaml"
        sh "sed -i s/NAMESPACE/cicd/g npm-deploy/values.yaml"
        sh "sed -i s/DOCKER_SERVER/${DOCKER_AWS_SERVER}/g npm-deploy/values.yaml"
        sh "sed -i 's/APP_IMAGE/${app_image}/g' npm-deploy/values.yaml"
        sh "sed -i s/HOSTNAME/${app_name}/g npm-deploy/values.yaml"
        sh "sed -i s/REPLICAS/1/g npm-deploy/values.yaml"
}

def deployHelmChart(String app_name){   
sh "helm upgrade --install ${app_name} npm-deploy"
}

def connectAws(){
        sh "aws eks --region ${AWS_DEFAULT_REGION} update-kubeconfig --name ${AWS_EKS_CLUSTER_NAME}"           
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
        sh "sudo docker build -t $DOCKER_AWS_SERVER/$app_name:$app_ver ."
              }
      }
    }
    stage('Push Image') {
      steps {
              sh "sudo aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${DOCKER_AWS_SERVER}"
              sh "sudo docker push ${DOCKER_AWS_SERVER}/$app_name:$app_ver"
      }
    }
    stage('Deploy') {
      steps {
        // Replace the values in the values.yaml   
        connectAws()      
        replaceAppHelmDeploy("$app_name","$app_ver")
        deployHelmChart("$app_name")
        
      }
    }
  }
  environment {
    DOCKER_AWS_SERVER = credentials('DOCKER_AWS_SERVER')
    AWS_EKSCICD_KEY_ID = credentials('AWS_EKSCICD_KEY_ID')
    AWS_EKSCICD_SECRET_KEY = credentials('AWS_EKSCICD_SECRET_KEY')
    AWS_DEFAULT_REGION= 'us-east-2'
    AWS_EKS_CLUSTER_NAME= 'vinodtest'      
  }
}
