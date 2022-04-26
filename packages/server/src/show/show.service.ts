import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowService {
  show(req) {
    const rawToken = req.headers['authorization'].split(' ')[1];
    return { token: rawToken };
  }
}
