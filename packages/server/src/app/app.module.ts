import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { LoginModule } from '../login/login.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `packages/server/.env.${process.env.NODE_ENV || 'development'}.local`,
        'packages/server/.env',
        `packages/server/.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: true,
      isGlobal: true,
    }),
    AccountModule,
    LoginModule,
    DatabaseModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
