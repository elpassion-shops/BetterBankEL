import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  show(@Req() req) {
    return this.showService.show(req);
  }
}
