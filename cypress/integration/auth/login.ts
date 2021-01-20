describe('Log In', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see login page', () => {
    cy.title().should('eq', 'Login | Chober-Eats');
  });

  it('can see email / password validation errors', () => {
    cy.get('form').within(() => {
      cy.findByPlaceholderText('이메일')
        .type('nowork')
        .findByRole('alert')
        .should('have.text', '이메일 형식이 올바르지 않습니다.')
        .findByPlaceholderText('이메일')
        .clear()
        .findByRole('alert')
        .should('have.text', 'Email is required.')
        .findByPlaceholderText('이메일')
        .type('cw.choiit@gmail.com')
        .findAllByPlaceholderText('비밀번호')
        .type('12345')
        .clear()
        .findByRole('alert')
        .should('have.text', 'Password is required.');
    });
  });

  it('can fill out the form and login', () => {
    cy.get('form').within(() => {
      cy.findByPlaceholderText('이메일')
        .type('cw.choiit2@gmail.com')
        .findByPlaceholderText('비밀번호')
        .type('1234')
        .findByRole('button')
        .should('not.have.class', 'pointer-events-none')
        .click();
    });
    cy.window().its('localStorage.chober-token').should('be.a', 'string');
  });
});
