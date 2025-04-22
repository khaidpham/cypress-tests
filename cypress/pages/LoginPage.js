export class LoginPage {
    visit() {
      cy.visit('https://access.paylocity.com');
    }
  
    enterCompanyId(companyId) {
      cy.get('#CompanyId').clear().type(companyId);
    }
  
    enterUsername(username) {
      cy.get('#Username').clear().type(username);
    }
  
    enterPassword(password) {
      cy.get('#Password').clear().type(password);
    }
  
    clickLogin() {
      cy.get('.login-button').click();
    }
  
    clickLoginSSO() {
        cy.get('.sso-login-button').click();
      }
    getErrorMessage() {
      return cy.get('.banner-message.error');
    }
  }
  