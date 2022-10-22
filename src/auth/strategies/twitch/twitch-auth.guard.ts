import { BadGatewayException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { SettingsService } from "src/settings/settings.types";
import { TwitchAuthService } from "./twitch-auth.service";

@Injectable()
export class TwitchAuthGuard implements CanActivate {
  constructor(
    private twitchAuthService: TwitchAuthService,
    private settingsService: SettingsService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { code } = req.query;
    if (typeof code !== "string") return false;
    const { profile, accessToken, refreshToken } = await this.twitchAuthService.getUserData({ code });

    req.session.profile = profile;
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
    return false;
  }
}