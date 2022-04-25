import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
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
let context: RenderResult<
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

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
    it('input for Recipient name should by initially empty', async () => {
      // given
      const recipientNameInputElement = context.getByLabelText(
        /Recipient/i
      ) as HTMLInputElement;

      // then
      expect(recipientNameInputElement.value).toBe('');
    });

    it('input for "From account" should by initially empty', async () => {
      // given
      const senderBankAccountNumberInputElement = context.getByLabelText(
        /From account/i
      ) as HTMLInputElement;

      // then
      expect(senderBankAccountNumberInputElement.value).toBe('');
    });

    it('input for "To account number" should by initially empty', async () => {
      // given
      const receiverBankAccountNumberInputElement = context.getByLabelText(
        /To account number/i
      ) as HTMLInputElement;

      // then
      expect(receiverBankAccountNumberInputElement.value).toBe('');
    });

    it('input for "Transfer date" should by initially empty', async () => {
      // given
      const transferDateInputElement = context.getByLabelText(
        /Transfer date/i
      ) as HTMLInputElement;

      // then
      expect(transferDateInputElement.value).toBe('');
    });

    it('input for "Transfer title" should by initially empty', async () => {
      // given
      const transferTitleInputElement = context.getByLabelText(
        /Transfer title/i
      ) as HTMLInputElement;

      // then
      expect(transferTitleInputElement.value).toBe('');
    });
  });

  describe('tests for SendTransferForm fields typing', () => {
    it('should be able to type account number', async () => {
      // given
      const recipientName = 'Jarosław Psikuta';
      const recipientNameInputElement = context.getByLabelText(
        /Recipient/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(recipientNameInputElement, recipientName);

      // then
      expect(recipientNameInputElement.value).toBe(recipientName);
    });

    it('should be able to type "From account"', async () => {
      // given
      const senderBankAccountNumberInputElement = context.getByLabelText(
        /From account/i
      ) as HTMLInputElement;
      const senderBankAccountNumber = '61109010140000071219812874';

      // when
      await userEvent.type(
        senderBankAccountNumberInputElement,
        senderBankAccountNumber
      );

      // then
      expect(senderBankAccountNumberInputElement.value).toBe(
        senderBankAccountNumber
      );
    });

    it('should be able to type "Adress"', async () => {
      // given
      const receiverAddressInputElement = context.getByLabelText(
        /From account/i
      ) as HTMLInputElement;
      const receiverAddress = 'Warszawa, ul. Władysława Jagiellońskiego 42';

      // when
      await userEvent.type(receiverAddressInputElement, receiverAddress);

      // then
      expect(receiverAddressInputElement.value).toBe(receiverAddress);
    });

    it('should be able to type "To account number"', async () => {
      // given
      const receiverBankAccountNumber = '61109010140000071219812874';
      const receiverBankAccountNumberInputElement = context.getByLabelText(
        /To account number/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(
        receiverBankAccountNumberInputElement,
        receiverBankAccountNumber
      );

      // then
      expect(receiverBankAccountNumberInputElement.value).toBe(
        receiverBankAccountNumber
      );
    });

    it('should be able to type "Transfer date"', async () => {
      // given
      const transferDate = '2011-10-05T14:48:00.000Z';
      const transferDateInputElement = context.getByLabelText(
        /Transfer date/i
      ) as HTMLInputElement;

      // when
      await userEvent.type(transferDateInputElement, transferDate);

      // then
      expect(transferDateInputElement.value).toBe(transferDate);
    });
  });

  it('should be able to type "Transfer title"', async () => {
    // given
    const transferTitle = 'Wypłata z EL Passion';
    const transferTitleInputElement = context.getByLabelText(
      /Transfer title/i
    ) as HTMLInputElement;

    // when
    await userEvent.type(transferTitleInputElement, transferTitle);

    // then
    expect(transferTitleInputElement.value).toBe(transferTitle);
  });
});
