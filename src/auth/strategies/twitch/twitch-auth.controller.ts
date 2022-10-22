import { Controller, Get, Inject, Post, Query, Redirect, Req, Res, Session, UnauthorizedException, UseFilters, UseGuards } from "@nestjs/common";
import { TwitchAuthService } from "./twitch-auth.service";
import { Request, Response } from "express";
import { TWITCH_AUTH_INIT_URL, TWITCH_AUTH_REDIRECT_URL } from "./twitch-auth.constants";
import { TwitchAuthGuard } from "./twitch-auth.guard";
import { TwitchAuthExceptionsFilter } from "./twitch-auth.filter";
import { UserService } from "src/user/user.service";

@Controller()
@UseFilters(TwitchAuthExceptionsFilter)
export class TwitchAuthController {
  constructor(
    private readonly twitchAuthService: TwitchAuthService,
    private readonly usersService: UserService,
  ) { }

  @Get('test')
  async test() {
    try {
    } catch (err) {
      console.log('err');
    }

  }

  @Get('auth/twitch/init')
  async init(
    @Query('successRedirect') successRedirect,
    @Query('failureRedirect') failureRedirect,
    @Res() res: Response,
  ) {
    res.redirect(this.twitchAuthService.getInitialUrl())
  }

  @Get(TWITCH_AUTH_REDIRECT_URL)
  @UseGuards(TwitchAuthGuard)
  @Redirect()
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.usersService.createWithTwitch({})
  }
}
