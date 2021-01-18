import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { Login, LOGIN_MUTATION } from '../login';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>,
      );
    });
  });

  it('should render OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Chober-Eats');
    });
  });

  it('display email validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText('이메일');
    await waitFor(() => {
      userEvent.type(email, 'this@wont');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('Email is required.');
  });

  it('display password required errors', async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText('이메일');
    const submitButton = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'this@won.com');
      userEvent.click(submitButton);
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('Password is required.');
  });

  it('submits form and call mutation', async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText('이메일');
    const password = getByPlaceholderText('비밀번호');
    const submitButton = getByRole('button');
    const formData = {
      email: 'real@test.com',
      password: '123',
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'xxx',
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitButton);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        ...formData,
      },
    });
  });
});
