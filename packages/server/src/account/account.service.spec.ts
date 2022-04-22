import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
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
