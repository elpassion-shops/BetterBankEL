import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  checkIsLogged(@Request() req) {
    return this.meService.me(req);
  }
}
