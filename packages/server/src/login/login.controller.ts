import { Controller, Get, Request, Response } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get('/')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    await res.cookie('isDupa', 'yesItIS');
    return { status: 200, msg: 'ok' };
  }
}
