describe('Create Account', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see email /password validation errors', () => {
    cy.findByText('계정 만들기')
      .click()
      .get('form')
      .within(() => {
        cy.findByPlaceholderText('이메일')
          .type('unvalidemail')
          .findByRole('alert')
          .should('have.text', '이메일 형식이 올바르지 않습니다.')
          .findByPlaceholderText('이메일')
          .clear()
          .findByRole('alert')
          .should('have.text', '이메일은 필수항목 입니다.')
          .findByPlaceholderText('이메일')
          .type('cw.choiit2@gmail.com')
          .findByPlaceholderText('비밀번호')
          .type('will be deleted')
          .clear()
          .findByRole('alert')
          .should('have.text', '패스워드는 필수항목 입니다.');
      });
  });

  it('should be able to create account', () => {
    cy.visit('/create-account')
      .get('form')
      .within(() => {
        cy.findByPlaceholderText('이메일')
          .type('testuser@user.com')
          .findByPlaceholderText('비밀번호')
          .type('testuser')
          .findByRole('select')
          .select('Owner')
          .select('Client')
          .findByRole('button')
          .click();
      });
    cy.url()
      .should('eq', Cypress.config().baseUrl + '/')
      .get('form')
      .within(() => {
        cy.findByPlaceholderText('이메일')
          .type('testuser@user.com')
          .findByPlaceholderText('비밀번호')
          .type('testuser')
          .findByRole('button')
          .click();
      });
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.window().its('localStorage.chober-token').should('be.a', 'string');
  });
});
