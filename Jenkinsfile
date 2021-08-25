pipeline {
  agent {
    docker 'circleci/node:9.3-stretch-browsers'
  }
  stages {
    stage('Verify Branch') {
      steps {
        echo "$GIT_BRANCH"
      }
    }
    stage('Docker Build') {
      steps {
        sh(script: 'docker images -a')
        sh(script: """
          docker images -a
          docker build -t jenkins-pipeline .
          docker images -a
        """)
      }
    }
  }
}