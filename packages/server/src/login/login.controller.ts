import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async login(@Req() req) {
    return this.loginService.login(req);
  }
}
