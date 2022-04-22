import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  sendAccountDetails() {
    return {
      accountBalance: 15000,
    };
  }
}
