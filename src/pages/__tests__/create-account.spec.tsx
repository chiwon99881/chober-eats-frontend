import { ApolloProvider } from '@apollo/client';
import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render, waitFor } from '../../test-utils';
import { UserRole } from '../../__generated__/globalTypes';
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from '../create-account';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe('<CreateAccount />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>,
      );
    });
  });

  it('renders OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('SignUp | Chober-Eats');
    });
  });

  it('renders validation errors', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText('이메일');
    const password = getByPlaceholderText('비밀번호');
    const button = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'wont@work');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('이메일은 필수항목 입니다.');
    await waitFor(() => {
      userEvent.type(email, 'working@working.com');
      userEvent.click(button);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('패스워드는 필수항목 입니다.');
  });

  it('submits mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText('이메일');
    const password = getByPlaceholderText('비밀번호');
    const button = getByRole('button');
    const formData = {
      email: 'working@working.com',
      password: '1234',
      role: UserRole.Client,
    };
    const mockedCreateAccountMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: 'if error has, this message',
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateAccountMutationResponse,
    );
    jest.spyOn(window, 'alert').mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        ...formData,
      },
    });
    expect(window.alert).toHaveBeenCalledWith(
      '계정 생성이 완료되었습니다! 로그인 하세요.',
    );
    const errorMessage = getByRole('alert');
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(errorMessage).toHaveTextContent('if error has, this message');
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
