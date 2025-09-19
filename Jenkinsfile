pipeline {
  agent any
  environment {
    AWS_REGION = 'ap-south-1'               // change if needed
    ECR_REPO_NAME = 'demo-app'
    ECS_CLUSTER = 'demo-app-cluster'
    ECS_SERVICE = 'demo-app-service'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: '', usernameVariable: '', passwordVariable: '')]) {
          sh '''
            export AWS_ACCESS_KEY_ID=${}
            export AWS_SECRET_ACCESS_KEY=${}
            export AWS_REGION=${AWS_REGION}
            AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
            ECR_URI=${351093152248}.dkr.ecr.${ap-south-1}.amazonaws.com/${ECR_REPO_NAME}

            # ensure repo exists (Terraform should create it; this is a safety)
            aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${AWS_REGION} || aws ecr create-repository --repository-name ${ECR_REPO_NAME} --region ${AWS_REGION}

            # login to ECR
            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

            # build & tag
            GIT_COMMIT_SHORT=$(echo ${GIT_COMMIT} | cut -c1-8)
            docker build -t ${ECR_URI}:${GIT_COMMIT_SHORT} ./app
            docker tag ${ECR_URI}:${GIT_COMMIT_SHORT} ${ECR_URI}:latest

            # push tags
            docker push ${ECR_URI}:${GIT_COMMIT_SHORT}
            docker push ${ECR_URI}:latest
          '''
        }
      }
    }

    stage('Deploy (ECS)') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'aws-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh '''
            export AWS_ACCESS_KEY_ID=${
}
            export AWS_SECRET_ACCESS_KEY=${}
            export AWS_REGION=${AWS_REGION}
            aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --force-new-deployment --region ${AWS_REGION}
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline completed successfully."
    }
    failure {
      echo "Pipeline failed — check logs."
    }
  }
}
