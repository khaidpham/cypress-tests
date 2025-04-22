// cypress/e2e/authentication.cy.js
describe('Login page', () => {
    beforeEach(() => {
      cy.visit('https://practicesoftwaretesting.com');
    });
  
    it('Should load login page', () => {
      cy.contains('Sign in').click();
      cy.url().should('include', '/login');
      cy.get('h3').should('contain', 'Login');
      cy.get('[data-test="email"]').should('be.visible');
      cy.get('[data-test="password"]').should('be.visible');
    });
  
    it('Should login with valid credentials', () => {
      cy.contains('Sign in').click();
      cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
      cy.get('[data-test="password"]').type('welcome01');
      cy.get('[data-test="login-submit"]').click();
      cy.url().should('include', '/account');
      cy.contains('My account').should('be.visible');
    });
  
    it('Should show error message with invalid credentials', () => {
      cy.contains('Sign in').click();
      cy.get('[data-test="email"]').type('invalid@example.com');
      cy.get('[data-test="password"]').type('invalidpassword');
      cy.get('[data-test="login-submit"]').click();
      cy.get('.alert-danger').should('be.visible');
      cy.contains('Invalid email or password').should('be.visible');
    });
    
    it('Should logout successfully', () => {
      // Login first
      cy.contains('Sign in').click();
      cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
      cy.get('[data-test="password"]').type('welcome01');
      cy.get('[data-test="login-submit"]').click();
      
      // Now navigate to logout
      cy.get('[data-test="nav-menu"]').click();
      cy.contains('Sign out').click();
      
      // Verify we're logged out and back at home page
      cy.url().should('include', '/login');
      cy.contains('Login').should('be.visible');
    });
  });