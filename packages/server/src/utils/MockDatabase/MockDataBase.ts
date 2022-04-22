import {
  IAccountDetails,
  ITransfer,
  ISendTransferResponse,
} from '../../../../interfaces/src/index';
import { MockDatabaseHelper } from './mockDatabase-helper';

export class MockDataBase {
  transfers: ITransfer[] = [];
  constructor(private readonly accountDetails: IAccountDetails) {}

  getAccountDetails(): IAccountDetails {
    return this.accountDetails;
  }

  addTransferToList(mockTransfer: ITransfer, id: string) {
    this.transfers.push({ id, ...mockTransfer });
  }

  sendTransfer(mockTransfer: ITransfer): ISendTransferResponse {
    const transferId = Math.random().toString();
    this.addTransferToList(mockTransfer, transferId);

    const accountBalanceAfterTransfer =
      MockDatabaseHelper.setBalanceAfterTransfer(
        mockTransfer.type,
        this.accountDetails.accountBalance,
        mockTransfer.amount
      );

    this.accountDetails.accountBalance =
      MockDatabaseHelper.setAccountBalanceIfBelowZero(
        this.accountDetails.accountBalance,
        accountBalanceAfterTransfer
      );

    return {
      isCorrect: MockDatabaseHelper.setIsCorrect(accountBalanceAfterTransfer),
      accountBalance: this.accountDetails.accountBalance,
      transferID: transferId,
      message: MockDatabaseHelper.setMessage(accountBalanceAfterTransfer),
    };
  }

  getTransfersHistory(): ITransfer[] {
    return this.transfers;
  }
}
