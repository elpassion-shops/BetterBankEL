import {
  IAccountDetails,
  ITransfer,
  ISendTransferResponse,
} from '../../../../interfaces/src/index';

class MockDataBase {
  transfers: ITransfer[] = [];
  constructor(private readonly accountDetails: IAccountDetails) {}

  getAccountDetails(): IAccountDetails {
    return this.accountDetails;
  }

  sendTransfer(mockTransfer: ITransfer): ISendTransferResponse {
    const transferId = Math.random().toString();
    this.transfers = [...this.transfers, { id: transferId, ...mockTransfer }];
    const accountBalance =
      mockTransfer.type === 'incoming'
        ? this.accountDetails.accountBalance + mockTransfer.amount
        : this.accountDetails.accountBalance - mockTransfer.amount;
    return {
      isCorrect: accountBalance >= 0 ? true : false,
      accountBalance:
        accountBalance >= 0
          ? accountBalance
          : this.accountDetails.accountBalance,
      transferID: transferId,
      message:
        accountBalance >= 0
          ? 'Ok'
          : "Something went wrong we didn't charge any money",
    };
  }

  getTransfersHistory(): any {
    return this.transfers;
  }
}

describe('MockDataBase', () => {
  let mockDb: MockDataBase;

  let mockAccountDetails: IAccountDetails = {
    accountBalance: 1000,
    accountNumber: '1234567890',
  };

  let mockTransfer: ITransfer = {
    type: 'incoming',
    date: new Date().toString(),
    amount: 1000,
    fromOrToName: 'Bartłomiej Wiercibrzuch',
  };

  let mockTransferMinus: ITransfer = {
    type: 'outgoing',
    date: new Date().toString(),
    amount: 1000,
    fromOrToName: 'Bartłomiej Wiercibrzuch',
  };

  beforeEach(() => {
    mockDb = new MockDataBase(mockAccountDetails);
  });
  it('should create new instance of class', () => {
    expect(mockDb).toBeTruthy;
  });

  it('should return Account Details', () => {
    expect(mockDb.getAccountDetails()).toEqual(mockAccountDetails);
  });

  it('should add transfer amount to accountBalance when "incoming" type passed', () => {
    expect(mockDb.sendTransfer(mockTransfer)).toEqual({
      isCorrect: true,
      accountBalance: 2000,
      transferID: expect.any(String),
      message: 'Ok',
    });
  });

  it('should subtract transfer amount from accountBalance when "outgoing" type passed', () => {
    expect(mockDb.sendTransfer(mockTransferMinus)).toEqual({
      isCorrect: true,
      accountBalance: 0,
      transferID: expect.any(String),
      message: 'Ok',
    });
  });

  it('should add transfer to transfers array', () => {
    const transfer = mockTransfer;
    mockDb.sendTransfer(transfer);
    expect(mockDb.transfers[0]).toEqual({
      id: expect.any(String),
      ...transfer,
    });
  });

  it('should display empty transfers history when no transfers added', () => {
    expect(mockDb.getTransfersHistory()).toEqual([]);
  });

  it('should display all transfers history', () => {
    const transfer1 = mockTransfer;
    const transfer2 = mockTransfer;
    mockDb.sendTransfer(transfer1);
    mockDb.sendTransfer(transfer2);
    expect(mockDb.getTransfersHistory()).toHaveLength(2);
  });
});
