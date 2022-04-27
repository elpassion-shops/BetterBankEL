import { IAccountDetails } from '@bank-el/interfaces';

export function randomAccnumberGenerator(): string {
  return `491020289222763005${Math.floor(
    Math.random() * 100000000
  ).toString()}`;
}

export class AccountGenerator {
  static generateRandomNumber() {
    return `491020289222763005${Math.floor(
      Math.random() * 100000000
    ).toString()}`;
  }

  static createAccount(email: string): IAccountDetails {
    return {
      email: email,
      accountBalance: 1000,
      accountNumber: this.generateRandomNumber(),
    };
  }
}
