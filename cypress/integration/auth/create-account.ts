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

  it('should be able to create account and login', () => {
    //intercept는 response를 mock 할 수 있는 방법이다.
    //매번 이 테스트를 진행할 때마다 유저를 생성하기 위해 이메일에 넣는 값을 바꿀 순 없으니
    //같은 이메일이지만 받는 response를 조작하여 우리의 backend가 계정이 정상적으로 생성되었다고 생각하게 끔 하는것
    cy.intercept('http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === 'createAccountMutation') {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: 'CreateAccountOutput',
              },
            },
          });
        });
      }
    });

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
