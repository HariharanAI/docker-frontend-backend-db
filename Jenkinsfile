pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git url: 'https://github.com/HariharanAI/docker-frontend-backend-db.git'
                }
            }
        }

        stage('Pull MongoDB Image') {
            steps {
                script {
                    sh 'docker pull mongo'
                }
            }
        }

        stage('Create Docker Network') {
            steps {
                script {
                    sh 'docker network create 3tir || true'
                }
            }
        }

        stage('Create Docker Volume') {
            steps {
                script {
                    sh 'docker volume create 3tir_vol || true'
                }
            }
        }

        stage('Run MongoDB Container') {
            steps {
                script {
                    def mongoExists = sh(script: 'docker ps -aq -f name=mongo', returnStdout: true).trim()
                    if (mongoExists) {
                        echo 'MongoDB container already exists. Stopping and removing it.'
                        sh 'docker stop mongo || true'
                        sh 'docker rm mongo || true'
                    }

                    sh '''
                    docker run -d \
                    --name mongo \
                    --network 3tir \
                    -v 3tir_vol:/data/db \
                    -e MONGODB_INITDB_ROOT_USERNAME=username \
                    -e MONGODB_INITDB_ROOT_PASSWORD=password \
                    mongo
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh 'docker build -t backend-image ./backend'
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    def backendExists = sh(script: 'docker ps -aq -f name=Backend', returnStdout: true).trim()
                    if (backendExists) {
                        echo 'Backend container already exists. Stopping and removing it.'
                        sh 'docker stop Backend || true'
                        sh 'docker rm Backend || true'
                    }

                    sh '''
                    docker run -d \
                    --name Backend \
                    --network 3tir \
                    -p 3008:3008 \
                    backend-image
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh 'docker build -t frontend-image ./frontend'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    // Check if port 3000 is already in use
                    def isPortInUse = sh(script: 'lsof -iTCP:3000 -sTCP:LISTEN', returnStatus: true)
                    if (isPortInUse == 0) {
                        error "Port 3000 is already in use. Please stop the process using it or choose a different port."
                    }

                    // Check if the Frontend container already exists
                    def frontendExists = sh(script: 'docker ps -aq -f name=frontend', returnStdout: true).trim()
                    if (frontendExists) {
                        echo 'Frontend container already exists. Stopping and removing it.'
                        sh 'docker stop frontend || true'
                        sh 'docker rm frontend || true'
                    }

                    // Run the Frontend container
                    sh '''
                    docker run -d \
                    --name frontend \
                    --network 3tir \
                    -p 3000:3000 \
                    frontend-image
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '3-tier architecture deployed successfully!'
        }
        failure {
            echo 'Deployment failed due to an error. Please check the logs for more details.'
        }
    }
}
