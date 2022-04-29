import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from '../mocks/mswServer';
import SendTransferForm from '../components/SendTransferForm';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ITransferSendFormData } from '@bank-el/interfaces';
import { renderWithClient } from '../mocks/utils';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe(SendTransferForm.name, () => {
  describe('tests for SendTransferForm initially fields', () => {
    it('input for Recipient name should by initially empty', async () => {
      expect(
        new SendTransferFormPageObject().receiverBankAccountNumberInputElement
          .value
      ).toBe('');
    });

    it('input for "From account" should by initially empty', async () => {
      expect(
        new SendTransferFormPageObject().senderBankAccountNumberInputElement
          .value
      ).toBe('');
    });

    it('input for "To account number" should by initially empty', async () => {
      expect(
        new SendTransferFormPageObject().receiverBankAccountNumberInputElement
          .value
      ).toBe('');
    });

    it('input for "Transfer date" should by initially empty', async () => {
      expect(
        new SendTransferFormPageObject().transferDateInputElement.value
      ).toBe('');
    });

    it('input for "Transfer title" should by initially empty', async () => {
      expect(
        new SendTransferFormPageObject().transferTitleInputElement.value
      ).toBe('');
    });
  });

  describe('tests for SendTransferForm fields typing', () => {
    it('should be able to type account number', async () => {
      const recipientName = 'Jarosław Psikuta';

      expect(
        (
          await new SendTransferFormPageObject().receiverBankAccountNumberInputElement.type(
            recipientName
          )
        ).value
      ).toBe(recipientName);
    });

    it('should be able to type "From account"', async () => {
      const senderBankAccountNumber = 'PL61109010140000071219812874';

      expect(
        (
          await new SendTransferFormPageObject().receiverBankAccountNumberInputElement.type(
            senderBankAccountNumber
          )
        ).value
      ).toBe(senderBankAccountNumber);
    });

    it('should be able to type "Adress"', async () => {
      const receiverAddress = 'Warszawa, ul. Władysława Jagiellońskiego 42';

      expect(
        (
          await new SendTransferFormPageObject().receiverAddressInputElement.type(
            receiverAddress
          )
        ).value
      ).toBe(receiverAddress);
    });

    it('should be able to type "To account number"', async () => {
      // given
      const receiverBankAccountNumber = '61109010140000071219812874';

      expect(
        (
          await new SendTransferFormPageObject().receiverBankAccountNumberInputElement.type(
            receiverBankAccountNumber
          )
        ).value
      ).toBe(receiverBankAccountNumber);
    });

    it('should be able to type "Transfer date"', async () => {
      const transferDate = '2022-04-26';

      expect(
        (
          await new SendTransferFormPageObject().transferDateInputElement.type(
            transferDate
          )
        ).value
      ).toBe(transferDate);
    });
  });

  it('should be able to type "Transfer title"', async () => {
    const transferTitle = 'Wypłata z EL Passion';

    expect(
      (
        await new SendTransferFormPageObject().transferTitleInputElement.type(
          transferTitle
        )
      ).value
    ).toBe(transferTitle);
  });
});

class SendTransferFormPageObject {
  context: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > = renderWithClient(<SendTransferForm />);

  filledWithData(data: ITransferSendFormData): SendTransferFormPageObject {
    this.receiverNameInputElement.type(data.receiverName);
    this.senderBankAccountNumberInputElement.type(data.senderBankAccountNumber);
    this.receiverAddressInputElement.type(data.receiverAddress);
    this.receiverBankAccountNumberInputElement.type(
      data.receiverBankAccountNumber
    );
    this.transferDateInputElement.type(data.transferDate.toISOString());
    this.transferTitleInputElement.type(data.transferTitle);
    this.transferAmountInputElement.type(data.transferAmount.toString());
    return this;
  }

  submitted(): SendTransferFormPageObject {
    this.submitButton.click();
    return this;
  }

  get submitButton() {
    return new ButtonPageObject(this.context, 'send');
  }

  displaysSuccessMessage() {
    return this.successMessage;
  }

  get successMessage() {
    return this.context.findByText('Pozdro 600');
  }

  get receiverNameInputElement() {
    return new InputPageObject(this.context, /Receiver/i);
  }

  get senderBankAccountNumberInputElement() {
    return new InputPageObject(this.context, /From account/i);
  }

  get receiverAddressInputElement() {
    return new InputPageObject(this.context, /Enter address/i);
  }

  get receiverBankAccountNumberInputElement() {
    return new InputPageObject(this.context, /To account number/i);
  }

  get transferDateInputElement() {
    return new InputPageObject(this.context, /Transfer date/i);
  }

  get transferTitleInputElement() {
    return new InputPageObject(this.context, /Transfer title/i);
  }

  get transferAmountInputElement() {
    return new InputPageObject(this.context, /Amount/i);
  }
}

class ButtonPageObject {
  button: HTMLButtonElement;
  constructor(context, name: string) {
    this.button = context.getByRole('button', { name: name });
  }

  click() {
    userEvent.click(this.button);
    return this.button;
  }
}

class InputPageObject {
  input: HTMLInputElement;
  constructor(context, name: RegExp) {
    this.input = context.getByLabelText(name);
  }

  async type(text: string) {
    await userEvent.type(this.input, text);
    return this.input;
  }

  get value() {
    return this.input.value;
  }
}
