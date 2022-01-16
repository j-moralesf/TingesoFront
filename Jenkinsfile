pipeline{
  //agent  {dockerfile true}
  agent any

  environment{
    DOCKERHUB_CREDENTIALS = credentials('id-dockerhub')
    //SONAR_TOKEN = credentials('id-sonarcloud')
  }

  stages{
    
    stage('SonarQube analysis') {
        dir("/var/lib/jenkins/workspace/tingeso-FrontEnd"){
          def scannerHome = tool 'SonarScanner 4.2.0.1873';
          withSonarQubeEnv('sonarcloud2') { // Will pick the global server connection you have configured
            sh "${scannerHome}/bin/sonar-scanner"
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
