<img width="270" height="46" alt="image" src="https://github.com/user-attachments/assets/0ef54985-68f4-4ffc-a961-114e3f431cac" /># PlaywrightEcommerce
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


1. Install Dependencies

npm install
npx playwright install

2. Run Tests

Run specific test suites via npm scripts:
npm run test:all         # Run all test cases
npm run test:addProduct  # Add product flow
npm run test:cartVerify  # Cart verification flow
npm run test:checkout    # Checkout flow
npm run test:endToEnd    # End-to-end flow

3. Generate Reports

npm run allure:generate   # Generate Allure report
npm run allure:open       # Open Allure report in browser
