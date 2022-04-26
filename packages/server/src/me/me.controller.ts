import { Controller, Get, Request, Response } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Get('/')
  checkIsLogged(@Request() req, @Response() res) {
    return this.meService.me();
  }
}
