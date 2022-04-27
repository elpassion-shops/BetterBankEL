import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from '@bank-el/dto-shared';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('/')
  async getAllTransfers() {
    return await this.transferService.getAllTransfers();
  }

  @Post('/new')
  async makeNewTransfer(@Body() body: TransferDto) {
    return await this.transferService.makeNewTransfer(body);
  }
}
