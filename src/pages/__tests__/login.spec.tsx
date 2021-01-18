import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { Login } from '../login';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
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
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText('이메일');
    await waitFor(() => {
      userEvent.type(email, 'this@wont');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('이메일 형식이 올바르지 않습니다.');
    await waitFor(() => {
      userEvent.clear(email);
    });
    debug();
  });
});
