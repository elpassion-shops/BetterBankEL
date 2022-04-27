import { Test, TestingModule } from '@nestjs/testing';
import { AccountFacade } from './account.facade';

describe('AccountService', () => {
  let service: AccountFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountFacade],
    }).compile();

    service = module.get<AccountFacade>(AccountFacade);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should send account balance and account number to a client', function () {
    expect(service.sendAccountDetails()).toEqual({
      accountBalance: expect.any(Number),
      accountNumber: expect.any(String),
    });
  });
});
