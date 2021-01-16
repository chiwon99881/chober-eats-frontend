import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';

describe('<Button />', () => {
  it('should render OK with props', () => {
    const { debug, getByText } = render(
      <Button actionText={'test'} canClick={true} loading={false} />,
    );
    debug();
    getByText('test');
  });

  it('should display loading', () => {
    const { debug, getByText, container } = render(
      <Button actionText={'test'} loading={true} canClick={false} />,
    );
    debug();
    getByText('로딩중 입니다...');
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
