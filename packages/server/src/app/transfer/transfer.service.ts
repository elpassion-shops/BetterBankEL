import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../database/entities/Transfer.entity';
import { SendTransferResponseDto, TransferDto } from '@bank-el/dto-shared';
import { Account } from '../database/entities/Account.entity';
import { ITransfer } from '@bank-el/interfaces';

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
    const transfers = await this.transferRepository.find({
      where: [
        { senderIBAN: account.accountNumber },
        { receiverIBAN: account.accountNumber },
      ],
    });
    return transfers.map((transfer: ITransfer) => {
      return {
        ...transfer,
        amount: Number(transfer.amount.toString().slice(1).replace(',', '')),
      };
    });
  }

  async makeNewTransfer(
    body: TransferDto,
    req
  ): Promise<SendTransferResponseDto | { status: number; msg: string }> {
    console.log(req.user);
    const email = req.user.email;
    const user = await this.accountRepository.findOneOrFail({
      where: { email: email },
    });
    const userReceiver = await this.accountRepository.findOneOrFail({
      where: { accountNumber: body.receiverIBAN },
    });

    const ammountFromAccount = Number(
      user.accountBalance.toString().slice(1).replace(',', '')
    );

    const ammountFromAccountREceiver = Number(
      userReceiver.accountBalance.toString().slice(1).replace(',', '')
    );

    // console.log(ammountFromAccountREceiver);

    if (ammountFromAccount < body.amount)
      return { status: 400, msg: 'Nie masz tyle hajsu' };
    if (user.accountNumber === body.receiverIBAN)
      return { status: 400, msg: 'Do siebie nie wyślesz :)' };

    const newTransfer = this.transferRepository.create({
      amount: body.amount,
      title: body.title,
      address: body.address,
      sender: req.user.nickname,
      senderIBAN: user.accountNumber,
      receiver: body.receiver,
      receiverIBAN: body.receiverIBAN,
    });
    user.accountBalance = ammountFromAccount - body.amount;
    userReceiver.accountBalance = ammountFromAccountREceiver + body.amount;
    const result = await this.transferRepository.save(newTransfer);

    await this.accountRepository.save(user);
    await this.accountRepository.save(userReceiver);

    return {
      isCorrect: true,
      transferID: result.id,
      accountBalance: user.accountBalance,
      message: 'Przelew wykonano',
    };
  }
}
