import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowService {
  show(req) {
    return req.user;
  }
}
