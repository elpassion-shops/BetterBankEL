import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../database/entities/Account.entity';
import { AccountController } from './account.controller';
import { AccountFacade } from './account.facade';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountFacade],
  exports: [AccountFacade],
})
export class AccountModule {}
