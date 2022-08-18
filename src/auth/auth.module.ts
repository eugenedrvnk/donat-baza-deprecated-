import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { TwitchAuthController } from './twitch-auth.controller';
import { TwitchAuthService } from './twitch-auth.service';

@Module({
  controllers: [TwitchAuthController],
  providers: [TwitchAuthService, AuthGuard],
})
export class AuthModule {}
