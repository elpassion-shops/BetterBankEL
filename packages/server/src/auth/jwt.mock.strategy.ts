import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategyMock extends PassportStrategy(Strategy) {
  public static SECRET_MOCK = 'jwt mock';
  constructor() {
    super({
      secretOrKey: JwtStrategyMock.SECRET_MOCK,

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: any) {
    return {
      userId: payload.username,
      groups: payload['cognito:groups'] || [],
    };
  }
}
