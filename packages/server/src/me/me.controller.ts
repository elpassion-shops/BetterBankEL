import { Controller, Get, Request, Response } from '@nestjs/common';

@Controller('me')
export class MeController {
  @Get('/')
  checkIsLogged(@Request() req, @Response() res) {
    if (req.cookies['isDupa'] === 'yesItIS')
      return res.status(200).send({ msg: 'You are logged in' });
    return res.status(401).send({ msg: 'Not logged in' });
  }
}
