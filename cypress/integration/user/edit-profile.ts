describe('Edit Profile', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.visit('/').login('testuser@user.com', 'testuser');
  });

  it('can go to /edit-profile using the header', () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.title().should('eq', 'Edit Profile | Chober-Eats');
    cy.url().should('eq', Cypress.config().baseUrl + '/edit-profile');
  });

  it('can change email', () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.get('form').within(() => {
      cy.findByPlaceholderText('Email')
        .clear()
        .type('newtestuser@user.com')
        .findByRole('button')
        .click();
    });
  });
});
