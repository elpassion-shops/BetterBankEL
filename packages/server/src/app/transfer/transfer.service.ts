import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../database/entities/Transfer.entity';
import { TransferDto } from '@bank-el/dto-shared';
import { Account } from '../database/entities/Account.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async getAllTransfers(req) {
    const email = req.user.email;
    const account = await this.accountRepository.findOneOrFail({
      where: { email: email },
    });

    return await this.transferRepository.find({
      where: [
        { senderIBAN: account.accountNumber },
        { receiverIBAN: account.accountNumber },
      ],
    });
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
