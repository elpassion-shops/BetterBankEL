import { Injectable, NotFoundException } from '@nestjs/common';
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
      const account = await this.accountRepository.findOneOrFail({
        email: req.user.email,
      });
      return {
        accountBalance: account.accountBalance,
        accountNumber: account.accountNumber,
      };
    } catch (error) {
      throw NotFoundException;
    }
  }
}
