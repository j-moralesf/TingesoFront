pipeline{
  //agent  {dockerfile true}
  agent any

  environment{
    DOCKERHUB_CREDENTIALS = credentials('id-dockerhub')
    //SONAR_TOKEN = credentials('id-sonarcloud')
  }

  stages{
    
    stage('SonarQube analysis') {
      steps{
          dir("/var/lib/jenkins/workspace/tingeso-FrontEnd"){
            withSonarQubeEnv('sonarcloud2') { // Will pick the global server connection you have configured
              sh "sonar-scanner \
                  -Dsonar.organization=betrayed10 \
                  -Dsonar.projectKey=betrayed10_TingesoFront2 \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=https://sonarcloud.io"
            }
          }
      }
    }

    stage('Docker Build'){
      steps{
        dir("/var/lib/jenkins/workspace/tingeso-FrontEnd"){
        // sudo usermod -a -G docker jenkins
        // reboot
        sh 'docker build -t lnkyn/tingesofront:latest .'
        } 
      }
    }

    stage('Login'){
      steps{
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }

    stage('Docker Hub'){
      steps{
        dir("/var/lib/jenkins/workspace/tingeso-FrontEnd"){
          sh 'docker push lnkyn/tingesofront:latest'
        }
        echo 'Docker hub stage' 
      }
    }
  }
}
