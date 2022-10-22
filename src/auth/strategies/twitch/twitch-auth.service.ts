import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SettingsService } from 'src/settings/settings.types';
import { TWITCH_AUTH_REDIRECT_URL } from './twitch-auth.constants';


@Injectable()
export class TwitchAuthService {
  private readonly twitchId = this.settingsService.getTwitchVars().clientId;
  private readonly twitchSecret = this.settingsService.getTwitchVars().clientSecret;

  constructor(
    private settingsService: SettingsService,
  ) { }

  getRedirectUrl = () => {
    return `${this.settingsService.getBackAppUrl()}/${TWITCH_AUTH_REDIRECT_URL}`;
  }

  getInitialUrl = () => {
    // return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${this.twitchId}&redirect_uri=${this.getRedirectUrl()}&scope=user:read:email`
    return 'https://id.twitch.tv/oauth2/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: this.twitchId,
        redirect_uri: this.getRedirectUrl(),
        scope: 'user:read:email',
      })
  }

  loginUser({code}: {code: string}) {
    
  }

  getUserData = async ({ code }: { code: string; }): Promise<{accessToken: string; refreshToken: string; profile: unknown}> => {
    const tokensResponse = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: this.twitchId,
      client_secret: this.twitchSecret,
      code,
      // redirectUrl is needed only to match oauth2 requirements, when request is going through axios - there is no redirect
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
    })

    const accessToken = tokensResponse.data.access_token;
    const refreshToken = tokensResponse.data.refresh_token;

    const usersResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': this.twitchId,
      }
    });

    const profile = usersResponse.data.data[0];

    return {
      accessToken,
      refreshToken,
      profile,
    }
  }
}