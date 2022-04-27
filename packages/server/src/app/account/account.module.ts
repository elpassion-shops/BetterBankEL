import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountFacade } from './account.facade';

@Module({
  controllers: [AccountController],
  providers: [AccountFacade],
})
export class AccountModule {}
