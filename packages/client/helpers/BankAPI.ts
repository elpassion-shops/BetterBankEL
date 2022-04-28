import {
  IBankAppAPI,
  IGetTransfersByDateRangeData,
  IJSONData,
  ITransfer,
} from '@bank-el/interfaces';
import { staticImplements } from './staticImplements';

@staticImplements<IBankAppAPI>()
export class BankAppAPI {
  static serverUrl = `${process.env.NEXT_PUBLIC_CLIENT}/api`;

  static postJson(url: string, method: string, data: IJSONData) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async getAccountDetails() {
    const response = await fetch(`${this.serverUrl}/account`);
    return response.json();
  }
  static async getTransfersHistory() {
    const response = await fetch(`${this.serverUrl}/transfers`);
    return response.json();
  }
  // ! url unknown
  static async getTransfersByDateRange(data: IGetTransfersByDateRangeData) {
    const response = await this.postJson(`${this.serverUrl}`, 'GET', data);
    return response.json();
  }

  static async sendTransfer(data: ITransfer) {
    const response = await this.postJson(
      `${this.serverUrl}/transfers/new`,
      'POST',
      data
    );
    return response.json();
  }
}
