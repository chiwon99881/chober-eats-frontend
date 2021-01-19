import { RenderResult, waitFor } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import React from 'react';
import { render } from '../../test-utils';
import { SearchForm } from '../search-form';

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

describe('<SearchForm />', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<SearchForm />);
  });

  it('render text', () => {
    const { getByText } = renderResult;
    getByText("Hungry? You're in the right place");
  });

  it('push with search term', async () => {
    const { getByPlaceholderText } = renderResult;
    const searchInput = getByPlaceholderText('🍙 Enter Food');
    await waitFor(() => {
      userEvent.type(searchInput, 'Korean');
      userEvent.type(searchInput, specialChars.enter);
    });
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/search',
      search: `?term=Korean`,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
