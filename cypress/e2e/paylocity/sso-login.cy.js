
describe('SSO Login page ', () => {
  beforeEach(() => {
    cy.visit('https://access.paylocity.com/Saml/SignIn');
  });
it('should intercept SignIn API call and validate request responses', () => {
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
});
