import { Controller, Get, Req } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}
  @Get('/')
  show(@Req() req) {
    return this.showService.show(req);
  }
}
