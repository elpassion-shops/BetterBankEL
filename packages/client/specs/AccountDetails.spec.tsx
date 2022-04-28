import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

import AccountDetails from '../components/AccountDetails';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  // given
  act(() => {
    context = render(<AccountDetails />);
  });
});
let context: RenderResult<
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

describe(AccountDetails.name, () => {
  describe('tests for basic render', () => {
    it('should render successfully', () => {
      // then
      expect(context).toBeTruthy();
    });
    it('should have account type', async () => {
      // given

      // when

      // then
      const accountTypeElement = context.queryByTestId('accountType');
      expect(accountTypeElement).not.toBeNull();
    });

    it('should have available founds', async () => {
      // given

      // when

      // then
      const availableFoundsElement = context.queryByTestId('availableFounds');
      expect(availableFoundsElement).not.toBeNull();
    });

    it('should have founds currency', async () => {
      // given

      // when

      // then
      const foundsCurrencyElement = context.queryByTestId('foundsCurrency');
      expect(foundsCurrencyElement).not.toBeNull();
    });

    it('should have upcoming payments', async () => {
      // given

      // when

      // then
      const upcomingPaymentsElement = context.queryByTestId('upcomingPayments');
      expect(upcomingPaymentsElement).not.toBeNull();
    });
  });
});
