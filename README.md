# QA Technical Assignment – Production Portal (Templates: Create & Edit)

## 1. Project Overview

This project contains automated end-to-end tests written in Cypress to validate the **Create** and **Edit** functionalities of Templates within the Production Portal.

Application under test:
Production Portal → Configuration → Templates

The test automation validates that:

- A new template can be created successfully.
- An existing template can be edited successfully.
- Changes are reflected correctly in the Templates list and template.

---

## 2. Scope of Automation

The following scenarios are automated:

1. Create Template
   - User clicks "Create Template"
   - User fills in required fields
   - User saves the template
   - Newly created template appears in the list

2. Edit Template
   - User selects an existing template
   - User modifies template details
   - User saves changes
   - Updated information is displayed correctly in the list

Manual test cases were created first and automation was implemented based on those scenarios.

---

## 3. Tech Stack

- Node.js
- Cypress (E2E Testing Framework)
- JavaScript

---

## 4. Project Structure

Hive-technical-assignement/
│
├─ cypress/
│ ├─ e2e/
│ │ └─ templates-crud.cy.js
│ ├─ fixtures/
│ └─ support/
│
├─ cypress.config.js
├─ package.json
├─ package-lock.json
└─ README.md
