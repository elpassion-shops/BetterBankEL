import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../database/entities/Account.entity';
import { Transfer } from '../database/entities/Transfer.entity';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Account])],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
