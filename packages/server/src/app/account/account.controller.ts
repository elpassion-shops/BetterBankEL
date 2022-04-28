import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AccountFacade } from './account.facade';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountFacade) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  sendAccountDetails(@Req() req) {
    return this.accountService.sendAccountDetails(req);
  }
}
