pipeline {
  agent any
  stages {
    stage('Verify Branch') {
      steps {
        echo "$GIT_BRANCH"
      }
    }
    stage('Docker Build') {
      steps {
        echo "hi"
        // pwsh(script: """
        //   docker images -a
        //   docker build -t jenkins-pipeline .
        //   docker images -a
        // """)
      }
    }
  }
}