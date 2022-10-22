import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionMiddleware } from './session.middleware';
import { TwitchAuthController } from './strategies/twitch/twitch-auth.controller';
import { TwitchAuthService } from './strategies/twitch/twitch-auth.service';
import { SessionService } from './session.service';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from 'src/settings/settings.module';
import { TwitchAuthGuard } from './strategies/twitch/twitch-auth.guard';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthRecordEntity } from './auth-record.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity, AuthRecordEntity]),
    ConfigModule,
    SettingsModule,
    UserModule
  ],
  controllers: [TwitchAuthController],
  providers: [TwitchAuthService, SessionService, TwitchAuthGuard],
})
export class AuthModule implements NestModule {
  configure: NestModule['configure'] = (consumer) => {
    consumer
      .apply(SessionMiddleware)
  }
}
