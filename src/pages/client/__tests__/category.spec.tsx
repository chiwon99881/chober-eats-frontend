import { MockedProvider } from '@apollo/client/testing';
import { RenderResult, waitFor } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render } from '../../../test-utils';
import { Category, CATEGORY_QUERY } from '../category';
import { InMemoryCache } from '@apollo/client';

describe('<Category />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: CATEGORY_QUERY,
                variables: {
                  input: {
                    slug: 'korean',
                  },
                },
              },
              result: {
                data: {
                  category: {
                    ok: true,
                    error: null,
                    totalPages: 1,
                    totalItems: 1,
                    restaurants: [
                      {
                        id: 1,
                        name: 'x',
                        coverImage: 'x',
                        category: {
                          name: 'x',
                        },
                        address: 'x',
                        isPromoted: false,
                      },
                    ],
                    category: {
                      id: 1,
                      name: 'x',
                      coverImage: 'x',
                      slug: 'x',
                      restaurantCount: 1,
                    },
                  },
                },
              },
            },
          ]}
          addTypename={false}
          cache={new InMemoryCache({ addTypename: false })}
        >
          <Category />
        </MockedProvider>,
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it('document title', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Category | Chober-Eats');
    });
  });
});
