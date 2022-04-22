import { IAccountDetails, ITransfer } from '@bank-el/interfaces';
import { MockDataBase } from './MockDataBase';

describe('MockDataBase', () => {
  let mockDb: MockDataBase;
  let mockAccountDetails: IAccountDetails;

  const mockTransfer: ITransfer = {
    type: 'incoming',
    date: new Date().toString(),
    amount: 1000,
    fromOrToName: 'Bartłomiej Wiercibrzuch',
  };

  const mockTransferMinus: ITransfer = {
    type: 'outgoing',
    date: new Date().toString(),
    amount: 1000,
    fromOrToName: 'Bartłomiej Wiercibrzuch',
  };

  beforeEach(() => {
    mockAccountDetails = {
      accountBalance: 1000,
      accountNumber: '1234567890',
    };
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
      message: 'ok',
    });
  });

  it('should subtract transfer amount from accountBalance when "outgoing" type passed', () => {
    expect(mockDb.sendTransfer(mockTransferMinus)).toEqual({
      isCorrect: true,
      accountBalance: 0,
      transferID: expect.any(String),
      message: 'ok',
    });
  });

  it('should not subtract transfer amount from accountBalance when "outgoing" type passed and not enough money', () => {
    mockDb.sendTransfer(mockTransferMinus);
    expect(mockDb.sendTransfer(mockTransferMinus)).toEqual({
      isCorrect: false,
      accountBalance: 0,
      transferID: expect.any(String),
      message: 'Something went wrong',
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
