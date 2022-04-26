import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  async login(req) {
    return { status: 200, userData: req.user };
  }
}
