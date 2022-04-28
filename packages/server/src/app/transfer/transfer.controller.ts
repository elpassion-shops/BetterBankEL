import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from '@bank-el/dto-shared';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAllTransfers(@Req() req) {
    return await this.transferService.getAllTransfers(req);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async makeNewTransfer(@Body() body: TransferDto, @Req() req) {
    return await this.transferService.makeNewTransfer(body, req);
  }
}
