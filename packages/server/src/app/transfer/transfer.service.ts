import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../database/entities/Transfer.entity';
import { SendTransferResponseDto, TransferDto } from '@bank-el/dto-shared';
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

  async makeNewTransfer(
    body: TransferDto,
    req
  ): Promise<SendTransferResponseDto | { status: number; msg: string }> {
    const email = req.user.email;
    const user = await this.accountRepository.findOneOrFail({
      where: { email: email },
    });
    if (user.accountBalance < body.amount)
      throw new Error('Nie masz tyle sianka');
    const newTransfer = await this.transferRepository.create({
      amount: body.amount,
      title: body.title,
      address: body.address,
      sender: req.user.nickname,
      senderIBAN: user.accountNumber,
      receiver: body.receiver,
      receiverIBAN: body.receiverIBAN,
    });
    const result = await this.transferRepository.save(newTransfer);
    return {
      isCorrect: true,
      transferID: result.id,
      accountBalance: user.accountBalance - body.amount,
      message: 'Przelew wykonano',
    };
  }
}
