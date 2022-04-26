import { Injectable } from '@nestjs/common';

@Injectable()
export class MeService {
  me(req) {
    return { user: req.user };
  }
}
