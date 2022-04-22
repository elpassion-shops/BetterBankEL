import { IAccountDetails } from '../../../../interfaces/src/index';

class MockDataBase {
  constructor(private readonly accountDetails: IAccountDetails) {}

  getAccountDetails(): any {
    return this.accountDetails;
  }
}

describe('MockDataBase', () => {
  let mockDb: MockDataBase;

  let mockAccountDetails: IAccountDetails = {
    accountBalance: 1000,
    accountNumber: 1234567890,
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
});
