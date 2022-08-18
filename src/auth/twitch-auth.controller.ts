import { Controller, Get, Query, Req, Res, Session, UseGuards } from "@nestjs/common";
import { TwitchAuthService } from "./twitch-auth.service";
import { AuthGuard } from "./auth.guard";
import { TwitchAuthGuard } from "./twitch-auth.guard";

@Controller()
export class TwitchAuthController {
  constructor(private authTwitchService: TwitchAuthService) { }

  @UseGuards(TwitchAuthGuard)
  @Get('test')
  test() {
    return 'nice'
  }

  @Get('auth/twitch')
  initAuth(@Res() res) {
    res.redirect(this.authTwitchService.getRedirectUrl());
  }

  @Get('auth/twitch/code')
  async code(
    @Query('code') code,
    @Session() session,
    @Res() res,
  ) {
    res.redirect('')
  }

  @Get('auth/twitch/callback')
  callback(@Req() req) {
  }
}
