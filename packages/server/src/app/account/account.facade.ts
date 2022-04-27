import { AccountGenerator } from '@bank-el/random-accnumber-generator';
import { Injectable } from '@nestjs/common';
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
      console.log(payload);
      await this.accountRepository.save(
        AccountGenerator.createAccount(payload.email)
      );
    } catch (error) {
      throw error;
    }
  }

  async sendAccountDetails(req) {
    return {
      accountBalance: 15000,
      accountNumber: '5919301262465077391297038',
    };
  }
}
