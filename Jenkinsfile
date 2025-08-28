pipeline {
    agent any
    tools {
        nodejs "node18"
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'addProduct', 'cartVerify', 'checkout'],
            description: 'Select which test suite to run'
        )
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.playwright"
    }

    stages {

        stage('Verify NodeJS') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Rohini010/PlaywrightEcommerce.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Clean Reports') {
            steps {
                sh 'npm run clean || true'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (params.TEST_SUITE == 'all') {
                        // full suite with allure
                        sh 'npm run test:allure'
                    } else if (params.TEST_SUITE == 'addProduct') {
                        sh 'npm run setup-auth && npx playwright test tests/addProduct.spec.js --reporter=line,allure-playwright --workers=1'
                    } else if (params.TEST_SUITE == 'cartVerify') {
                        sh 'npm run setup-auth && npx playwright test tests/cartVerify.spec.js --reporter=line,allure-playwright --workers=1'
                    } else if (params.TEST_SUITE == 'checkout') {
                        sh 'npm run setup-auth && npx playwright test tests/checkout.spec.js --reporter=line,allure-playwright --workers=1'
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            allure([
                reportBuildPolicy: 'ALWAYS',
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
