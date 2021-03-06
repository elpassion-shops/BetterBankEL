import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountFacade } from './account.facade';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountFacade],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should send account balance and account number to a client', function () {
    expect(controller.sendAccountDetails()).toEqual({
      accountBalance: expect.any(Number),
      accountNumber: expect.any(String),
    });
  });
});
