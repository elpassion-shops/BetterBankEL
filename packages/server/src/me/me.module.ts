import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [MeController],
})
export class MeModule {}
