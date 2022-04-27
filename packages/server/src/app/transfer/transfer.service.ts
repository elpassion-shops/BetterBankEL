import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../database/entities/Transfer.entity';
import { TransferDto } from '@bank-el/dto-shared';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>
  ) {}

  async getAllTransfers() {
    return await this.transferRepository.find();
  }

  async makeNewTransfer(body: TransferDto) {
    try {
      const newTransfer = await this.transferRepository.create({ ...body });
      return this.transferRepository.save(newTransfer);
    } catch (error) {
      throw error;
    }
  }
}
