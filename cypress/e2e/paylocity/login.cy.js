// cypress/e2e/paylocity/login.cy.js
  
  describe('Paylocity login page', () => {
    beforeEach(() => {
      cy.visit('https://access.paylocity.com');
    });
  
    it('should have valid page title and URL', () => {
      cy.title().should('include', 'Paylocity');
      cy.url().should('include', 'https://access.paylocity.com');
    });

    it('should display all necessary input fields and login button', () => {
      cy.get('#CompanyId').should('be.visible').and('have.attr', 'name', 'CompanyId');
      cy.get('#Username').should('be.visible').and('have.attr', 'name', 'Username');
      cy.get('#Password').should('be.visible').and('have.attr', 'name', 'Password');
      cy.get('.login-button').should('be.visible').and('contain.text', 'Login');
    });
    
    it('should show an error message when login with empty fields', () => {
      cy.get('.login-button').click();
      cy.get('.banner-message.error').should('be.visible').invoke('text').then((text) => {
        cy.log(`Banner message: ${text}`);
      });

      // Validate the error message
      cy.get('.banner-message.error').should('contain.text', 'The credentials provided are incorrect');
    });
});