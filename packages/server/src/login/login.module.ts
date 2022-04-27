import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  providers: [LoginService, JwtStrategy],
  controllers: [LoginController],
})
export class LoginModule {}
