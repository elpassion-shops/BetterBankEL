import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}
  async login() {
    return {
      status: 200,
      access_token: this.jwtService.sign('someString'),
    };
  }
}
