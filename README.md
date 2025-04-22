# 🧪 Cypress Tests

Automated end-to-end tests using [Cypress](https://www.cypress.io/) to ensure quality and stability across the application. This project is structured with the Page Object Model (POM) for maintainability and scalability.

---

## 📦 Project Structure

```
cypress-tests/
├── cypress/
│   ├── e2e/
│   │   ├── paylocity/       # Tests for Paylocity site
│   │   │   └── home.cy.js
│   │   │   └── login.cy.js
│   │   │   └── login-sso.cy.js
│   │   └── practices/       # Tests for practicesoftwaretesting.com
│   │       └── home.cy.js
│   │       └── login.cy.js
│   └── support/
│       └── commands.js      # Custom Cypress commands
│   └── pages/                   # Page Object classes
│       └── LoginPage.js
├── .github/workflows/
│   └── cypress.yml          # GitHub Actions CI workflow
├── package.json
├── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Cypress (`npm install` handles it)

### Install Dependencies

```bash
npm install
```

---

## 🧪 Run Tests Locally

### Run in Headless Mode

```bash
npx cypress run
```

### Run in Interactive Mode

```bash
npx cypress open
```

---

## ✅ Test with GitHub Actions

This repo includes a GitHub Actions workflow (`.github/workflows/cypress.yml`) that:
- Runs on every push and pull request
- Installs dependencies
- Starts your local server (`npm start`)
- Runs Cypress tests in headless mode

To use it, make sure:
- Your app starts at `http://localhost:3000`
- Your `npm start` command is configured correctly in `package.json`

---

## 🧩 Page Object Model (POM)

Reusable page classes are located in the `pages/` directory. Example:

```js
import { LoginPage } from '../pages/LoginPage';

const login = new LoginPage();
login.visit();
login.enterUsername('test');
```

---

## 🌐 Cypress Cloud (Optional)

If you use Cypress Cloud, make sure to:
1. Set `CYPRESS_RECORD_KEY` in your GitHub repo secrets
2. Update the workflow to include:
```yaml
with:
  record: true
  parallel: false
env:
  CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

---

## 📄 License

MIT © [Khai Pham]
