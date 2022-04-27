import { Controller, Get } from '@nestjs/common';
import { AccountFacade } from './account.facade';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountFacade) {}
  @Get('/')
  sendAccountDetails() {
    return this.accountService.sendAccountDetails();
  }
}
