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
    // 이번엔 response가 아닌 request를 mock 하였다.
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'editProfileMutation') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'testuser@user.com';
      }
    });

    cy.get('a[href="/edit-profile"]').click();
    cy.get('form').within(() => {
      cy.findByPlaceholderText('Email')
        .clear()
        .type('newtestuser@user.com')
        .findByRole('button')
        .click();
    });
    cy.findByRole('verify-popup').should('exist');
  });
});
