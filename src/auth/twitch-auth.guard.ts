import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { TwitchAuthService } from "./twitch-auth.service";

@Injectable()
export class TwitchAuthGuard implements CanActivate {
  constructor(private twitchAuthService: TwitchAuthService) {}
  
  canActivate: CanActivate['canActivate'] = async (context) => {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query.params;
    const profile = await this.twitchAuthService.getProfile(code);


    return false;
    // const code = 
    // const profile/ = this.twitchAuthService.getProfile()
  }
}