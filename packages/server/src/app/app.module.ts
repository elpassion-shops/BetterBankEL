import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from '../account/account.module';
import { TransfersModule } from '../transfers/transfers.module';

@Module({
  imports: [AccountModule, TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
