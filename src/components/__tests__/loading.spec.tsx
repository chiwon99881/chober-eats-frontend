import { RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import { Loading } from '../loading';

describe('<Loading />', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Loading />);
  });

  it('render text', () => {
    const { container, getByText } = renderResult;
    getByText('잠시만 기다려 주세요...');
    expect(container.firstChild).toHaveClass('h-screen');
  });
});
