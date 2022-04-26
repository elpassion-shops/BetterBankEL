import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [MeController],
  providers: [MeService, JwtStrategy],
})
export class MeModule {}
