import { Controller, Get, Request, Response } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get('/')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    return res.cookie('isDupa', 'yesItIS').status(200).json({ msg: 'ok' });
  }
}
