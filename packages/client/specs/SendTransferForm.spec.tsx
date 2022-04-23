import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import SendTransferForm from '../components/SendTransferForm';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

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

  describe('tests for SendTransferForm initially fields', () => {
    it('input for "To account number" should by initially empty', async () => {
      // given
      const accountNumberInputElement = context.getByPlaceholderText(
        /To account number/i
      ) as HTMLInputElement;

      // then
      expect(accountNumberInputElement.value).toBe('');
    });

    it('input for "Title of transfer" should by initially empty', async () => {
      // given
      const transferTitleInputElement = context.getByPlaceholderText(
        /Title of transfer/i
      ) as HTMLInputElement;

      // then
      expect(transferTitleInputElement.value).toBe('');
    });

    it('input for "From the account" should by initially empty', async () => {
      // given
      const fromAccountElementElement = context.getByPlaceholderText(
        /From account/i
      ) as HTMLInputElement;

      // then
      expect(fromAccountElementElement.value).toBe('');
    });

    it('input for "Transfer date" should by initially empty', async () => {
      // given
      const transferDateInputElement = context.getByPlaceholderText(
        /Transfer date/i
      ) as HTMLInputElement;

      // then
      expect(transferDateInputElement.value).toBe('');
    });
  });

  describe('tests for SendTransferForm fields typing', () => {
    it('should be able to type account number', async () => {
      // given
      const bankAccountNumber = '61109010140000071219812874';
      const accountNumberInputElement = context.getByPlaceholderText(
        /To account number/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(accountNumberInputElement, bankAccountNumber);

      // then
      expect(accountNumberInputElement.value).toBe(bankAccountNumber);
    });

    it('should be able to type title for transfer', async () => {
      // given
      const transferTitle = 'Wypłata z EL Passion';
      const transferTitleInputElement = context.getByPlaceholderText(
        /Title of transfer/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(transferTitleInputElement, transferTitle);

      // then
      expect(transferTitleInputElement.value).toBe(transferTitle);
    });

    it('input for "From the account" should by initially empty', async () => {
      // given
      const fromAccountInputElement = context.getByPlaceholderText(
        /From account/i
      ) as HTMLInputElement;
      const fromAccount = '61109010140000071219812874';

      // when
      await userEvent.type(fromAccountInputElement, fromAccount);

      // then
      expect(fromAccountInputElement.value).toBe(fromAccount);
    });

    it('input for "Transfer date" should by initially empty', async () => {
      // given
      const transferDate = '2011-10-05T14:48:00.000Z';
      const transferDateInputElement = context.getByPlaceholderText(
        /Transfer date/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(transferDateInputElement, transferDate);

      // then
      expect(transferDateInputElement.value).toBe(transferDate);
    });
  });
});
