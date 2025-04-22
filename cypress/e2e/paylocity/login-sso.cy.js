// cypress/e2e/paylocity/sso-login.cy.js
import { LoginPage } from '../../pages/LoginPage';

const loginPage = new LoginPage();

describe('SSO Login page ', () => {
  beforeEach(() => {
    cy.visit('https://access.paylocity.com/Saml/SignIn');
  });
  it('should return corresponding network request responses to invalid company', () => {
    cy.intercept('POST', '**/SignIn').as('loginRequest');

    cy.get('#CompanyId').type('abc123');
    cy.get('.sso-login-button').click();

    // Wait for the intercepted network call
    cy.wait('@loginRequest').then((interception) => {
      const requestUrl = interception.request.url;
      const statusCode = interception.response?.statusCode;
      const rawBody = interception.request.body;

      // Print to Cypress runner + browser console
      cy.log(`Request URL: ${requestUrl}`);
      cy.log(`Status Code: ${statusCode}`);
      cy.log(`Raw Request Body: ${rawBody}`);

      // Validate the intercepted request response code, URL, and body
      expect(statusCode).to.eq(200);
      expect(requestUrl).to.include('https://access.paylocity.com/Saml/SignIn');
      expect(rawBody).to.include('abc123');

      // Validate the SSO error message
      cy.get('.banner-message.error').should('contain.text', "This company doesn't support single sign-on");
    });
  });
  
  // POP version of the login with SSO test
  it('should return corresponding network request responses to invalid company - POM version', () => {
    cy.intercept('POST', '**/SignIn').as('loginRequest');

    loginPage.enterCompanyId('sso123');
    loginPage.clickLoginSSO();
    cy.wait('@loginRequest').then((interception) => {
      const requestUrl = interception.request.url;
      const statusCode = interception.response?.statusCode;
      const rawBody = interception.request.body;
      expect(statusCode).to.eq(200);
      expect(requestUrl).to.include('https://access.paylocity.com/Saml/SignIn');
      expect(rawBody).to.include('sso123');
    });
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', "This company doesn't support single sign-on");
  });
});
