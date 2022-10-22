import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { SettingsService } from 'src/settings/settings.types';

@Catch()
export class TwitchAuthExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly settingsService: SettingsService,
  ) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    ctx.getResponse().redirect(this.settingsService.getFrontAppUrl() + '?failure=true');
  }
}
