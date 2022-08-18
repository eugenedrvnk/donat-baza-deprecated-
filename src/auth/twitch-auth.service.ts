import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from './types/auth.service.type';

@Injectable()
export class TwitchAuthService implements AuthService {
  getInitialUrl: AuthService['getInitialUrl'] = () => {
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=x827kaful401uv6i5j0mpgbq0xwr8m&redirect_uri=https://8fbe-45-128-189-11.ngrok.io/auth/twitch/code&scope=user:read:email`;
  }

  getProfile: AuthService['getProfile'] = (code) => {
    return axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: 'x827kaful401uv6i5j0mpgbq0xwr8m',
      client_secret: 'zwyg3vci9cvxp2dr31lpu7wirbq6pv',
      code,
      redirect_uri: 'https://8fbe-45-128-189-11.ngrok.io/auth/twitch/callback',
      grant_type: 'authorization_code',
    }).then(res => {
      const token = res.data.access_token;
      return axios.get('https://api.twitch.tv/helix/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-Id': 'x827kaful401uv6i5j0mpgbq0xwr8m',
        }
      }).then(res => { return res.data.data[0] })
    })
  }
}
