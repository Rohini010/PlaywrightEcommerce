This repository contains an **end-to-end automation testing framework** built using **Playwright** for e-commerce workflows.  
It supports **cross-browser testing, CI/CD integration with Jenkins, and reporting via Allure & Playwright reports**.

---

Features
- Playwright-based UI test automation
- Cross-browser execution (Chromium, Firefox, WebKit)
- Centralized locators (`locators.json`) for maintainability
- Jenkins pipeline (`Jenkinsfile`) for CI/CD
- Allure & Playwright reports for execution insights
- Modular test suites (addProduct, cartVerify, checkout, end-to-end)

## Setup Instructions

### 1. Install Dependencies

npm install
npx playwright install

### 2. Run Tests

### Run all test cases
npm run test:all         

### Add product flow
npm run test:addProduct  

### Cart verification flow
npm run test:cartVerify  

### Checkout flow
npm run test:checkout    

### End-to-end flow
npm run test:endToEnd    


### 3. Generate Reports

### Generate Allure report
npm run allure:generate   

### Open Allure report in browser
npm run allure:open       

### Reports

1. Playwright HTML Report → stored in playwright-report/
2. Allure Report → generated in allure-results/ and published in Jenkins
