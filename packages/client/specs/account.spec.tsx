import React from 'react';
import { render } from '@testing-library/react';
import 'whatwg-fetch';
import Account from '../pages/account';
import { mswServer } from '../mocks/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

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
    const accountBalance = '42';

    // when

    // then
    const linkElement = await findByText(`Account balance: ${accountBalance}`);
    expect(linkElement).not.toBeNull();
  });

  it('should have Account number', async () => {
    // given
    const { findByText } = render(<Account />);
    const accountNumber = '61109010140000071219812874';
    // when

    // then
    const element = await findByText(`Account number: ${accountNumber}`);
    expect(element).not.toBeNull();
  });
});
