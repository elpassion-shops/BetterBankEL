import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import AccountHistory from '../components/AccountHistory';
import '@testing-library/jest-dom';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  // given
  act(() => {
    context = render(<AccountHistory />);
  });
});
let context: RenderResult<
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

describe(AccountHistory.name, () => {
  describe('tests for basic render', () => {
    it('should render successfully', () => {
      // then
      expect(context).toBeTruthy();
    });

    it('should render the title', async () => {
      // then
      expect(await context.findByText('Transaction history')).not.toBeNull();
    });
  });
});
