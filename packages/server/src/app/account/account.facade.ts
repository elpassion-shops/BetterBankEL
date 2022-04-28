import { AccountGenerator } from '@bank-el/random-accnumber-generator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../database/entities/Account.entity';

@Injectable()
export class AccountFacade {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>
  ) {}

  async createAccount(payload) {
    try {
      const account = await this.accountRepository.findOne({
        email: payload.email,
      });
      if (account) return;
      await this.accountRepository.save(
        AccountGenerator.createAccount(payload.email)
      );
    } catch (error) {
      throw error;
    }
  }

  async sendAccountDetails(req) {
    try {
      const account = await this.accountRepository.findOneOrFail({
        email: req.user.email,
      });
      account.accountBalance = Number(
        account.accountBalance.toString().slice(1).replace(',', '')
      );
      return account;
    } catch (error) {
      throw NotFoundException;
    }
  }
}
