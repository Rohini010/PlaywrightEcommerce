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
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.playwright"
    }

    stages {

        stage('Verify NodeJS') {
            steps {
                bat 'node -v'
                bat 'npm -v'
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
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Clean Reports') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npm run clean'
                }
            }
        }

      stage('Run Tests') {
    steps {
        script {
            if (params.TEST_SUITE == 'all') {
                // npm run test:allure
                bat 'npm run test:allure'
            } else if (params.TEST_SUITE == 'addProduct') {
                bat 'cmd /c "npx playwright test tests/addProduct.spec.js --reporter=line,allure-playwright --workers=1"'
            } else if (params.TEST_SUITE == 'cartVerify') {
                bat 'cmd /c "npx playwright test tests/cartVerify.spec.js --reporter=line,allure-playwright --workers=1"'
            } else if (params.TEST_SUITE == 'checkout') {
                bat 'cmd /c "npx playwright test tests/checkout.spec.js --reporter=line,allure-playwright --workers=1"'
            }
        }
    }
}


        stage('Generate Allure Report') {
            steps {
                bat 'npm run allure:generate'
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
