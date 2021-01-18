import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import { queryByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import { ME } from '../../hooks/useMe';
import { Header } from '../header';
import { isVerifyPage } from '../../apollo';

//hook을 mock하는게 아니라 hook에서 사용하는 graphql query, mutation을 mock해야 한다.
const meMock = [
  {
    request: {
      query: ME,
    },
    result: {
      data: {
        me: {
          id: 1,
          email: '',
          role: '',
          verified: true,
        },
      },
    },
  },
];

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      isVerifyPage(false);
      const { getByText, container, queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText('회원님, 이메일 인증을 해주세요.');
      expect(
        container.firstElementChild?.lastChild?.firstChild,
      ).toHaveAttribute('href', '/verify-email');
      expect(container.firstElementChild?.lastChild?.firstChild).toBeEnabled();
      getByText('이메일 인증하러 가기 →');
    });
  });

  it('renders without verify banner', async () => {
    await waitFor(async () => {
      isVerifyPage(false);
      //queryByText와 getByText 차이는 queryByText는 해당 text가 없으면 null을 리턴한다.
      //getByText는 없으면 에러를 반환한다.
      const { queryByText } = render(
        <MockedProvider mocks={meMock}>
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText('회원님, 이메일 인증을 해주세요.')).toBeNull();
    });
  });
});
