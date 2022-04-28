import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../app/database/entities/Account.entity';
import { AccountDetailsDto } from '@bank-el/dto-shared';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) {}

  async login(req): Promise<AccountDetailsDto | { status: number; err }> {
    try {
      const user = await this.accountRepository.findOne({
        email: req.user.login,
      });
      return {
        accountBalance: user.accountBalance,
        accountNumber: user.accountNumber,
      };
    } catch (err) {
      return { status: 500, err };
    }
  }
}
