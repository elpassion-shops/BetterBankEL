import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  sendAccountDetails() {
    return {
      accountBalance: 15000,
      accountNumber: '5919301262465077391297038',
    };
  }
}
