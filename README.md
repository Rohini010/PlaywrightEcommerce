This repository contains an **end-to-end automation testing framework** built using **Playwright** for e-commerce workflows.  
This project demonstrates self-healing locators, session reusability, and modular Page Object Model (POM), cross-browser testing, CI/CD integration with Jenkins, and reporting via Allure & Playwright reports**.

---

## Features


- **Playwright-based UI test automation**
- **Cross-browser execution** (Chromium, Firefox, WebKit)
- **Centralized locators** (`locators.json`) for maintainability
- **Page Object Model (POM):** Clean separation of test logic and UI locators

### AI-based Locator Handling (`AIWrapper`)
- Tries multiple strategies (CSS, XPath, Role, Text)
- Falls back to **fuzzy matching** using Levenshtein similarity if primary locators break
- Improves test resilience against UI changes

### Locator Caching (`BasePage`)
- Stores working selectors in `locators.json`
- Reuses cached selectors for faster, more stable tests

### Session Management (`SessionManager`)
- Automates login once and stores session in `auth.json`
- Skips repetitive login steps for faster test execution

### CI/CD Integration
- Jenkins pipeline (`Jenkinsfile`) for automated test runs
- Supports reporting & artifact publishing

### Reporting
- **Playwright HTML Report**
- **Allure Report** (local + Jenkins integration)

### Modular Test Suites
- `addProduct`
- `cartVerify`
- `checkout`
- `endToEnd`

## Setup Instructions

### 1. Install Dependencies

  #### a. npm install
  #### b. npx playwright install
  #### c. npm install levenshtein --save   
  #### d. npm install -D allure-playwright 

### 2. Run Tests

### Run all test cases
 - npm run test:all         

### Add product flow
 - npm run test:addProduct  

### Cart verification flow
 - npm run test:cartVerify  

### Checkout flow
 - npm run test:checkout    

### End-to-end flow
 - npm run test:endToEnd    


### 3. Generate Reports

### Generate Allure report
 - npm run allure:generate   

### Open Allure report in browser
 - npm run allure:open       

### Reports

1. Playwright HTML Report → stored in playwright-report/
2. Allure Report → generated in allure-results/ and published in Jenkins
