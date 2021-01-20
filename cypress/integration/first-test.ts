describe('Log In', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see login page', () => {
    cy.title().should('eq', 'Login | Chober-Eats');
  });

  it('can fill out the form', () => {
    cy.get('form').within(() => {
      cy.findByPlaceholderText('이메일')
        .type('cw.choiit2@gmail.com')
        .findByPlaceholderText('비밀번호')
        .type('1234')
        .findByRole('button')
        .should('not.have.class', 'pointer-events-none');
    });
  });

  it('can see email / password validation errors', () => {
    cy.get('form').within(() => {
      cy.findByPlaceholderText('이메일')
        .type('nowork')
        .findByRole('alert')
        .should('have.text', '이메일 형식이 올바르지 않습니다.');
    });
  });
});
