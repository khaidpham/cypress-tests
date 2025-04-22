// cypress/e2e/paylocity/home.cy.js

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("top.$ is not a function")) {
    return false; // Ignore this specific error
  }
});

describe('Paylocity Public Home page', () => {
  beforeEach(() => {
    cy.visit('https://www.paylocity.com/', { failOnStatusCode: false });
  });

  it('should show homepage title', () => {
    cy.title().should('include', 'Paylocity');
  });

  it('should request and validate that login link returns HTTP 200', () => {
    cy.contains('login').should('have.attr', 'href').then((href) => {
      href.includes('https://access.paylocity.com');

      // Validate the destination returns HTTP 200
      cy.request(href).its('status').should('eq', 200);
    });
  });


  it('should have Platform tiles and titles', () => {
    cy.get('.cmp-title').should('contain', 'All-In-One Platform');
  });    

  it('should display the hero section and heading', () => {
    cy.get('.hero-teaser').should('be.visible');
    cy.get('.hero-teaser h1').should('include.text', 'Simplify Payroll from Day One');
  });

  it('should display Platform solutions name and URL', () => {
    const expectedTexts = [
      'Payroll Software',
      'Benefits Administration',
      'HR Software',
      'Time & Attendance',
      'Talent Management',
      'Employee Experience',
    ];

    // validate the number of Platform items
    cy.get('.cmp-icon-tiles .cmp-icon-tile').should('have.length', expectedTexts.length);
    
    // validate the text of .cpm-icon-tile elements inside the .cmp-icon-tiles container
    cy.get('.cmp-icon-tiles .cmp-icon-tile span').each((item, index) => {
      cy.wrap(item).should('have.text', expectedTexts[index]);
    });

    const expectedUrls = [
      '/payroll',
      '/benefits',
      '/human-resources-software',
      '/time-and-attendance',
      '/talent-management',
      '/employee-experience',
    ];

    // validate the number and href value of .cpm-icon-tile elements
    cy.get('.cmp-icon-tiles .cmp-icon-tile a')
      .should('have.length', expectedUrls.length)
      .each((link, index) => {
        cy.wrap(link)
          .should('have.attr', 'href')
          .and('include', expectedUrls[index]);
      });
    });
  });
