import React from 'react';
import { render } from '@testing-library/react';

import Account from '../pages/account';

describe(Account.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Account />);
    expect(baseElement).toBeTruthy();
  });

  it('should contain proper title', async () => {
    // given
    const context = render(<Account />);

    // when

    // then
    const element = await context.findByText('Account');
    expect(element).not.toBeNull();
  });

  it('should have Account balance', async () => {
    // given
    const { findByText } = render(<Account />);

    // when

    // then
    const linkElement = await findByText('Account balance: 0');
    expect(linkElement).not.toBeNull();
  });
});
