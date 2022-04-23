import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import SendTransferForm from '../components/SendTransferForm';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  // given
  act(() => {
    context = render(<SendTransferForm />);
  });
});
let context = render(<SendTransferForm />);

describe(SendTransferForm.name, () => {
  describe('tests for basic render', () => {
    it('should render successfully', () => {
      // then
      expect(context).toBeTruthy();
    });

    it('should have a submit button', () => {
      // given
      const addButtonElement = context.getByRole('button', { name: 'Send' });

      // then
      expect(addButtonElement).not.toBeNull();
    });
  });
});
