import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AccountModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
