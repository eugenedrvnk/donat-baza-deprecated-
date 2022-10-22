import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionModule } from 'nestjs-session';
import { AuthModule } from './auth/auth.module';
import config from './database/mikro-orm.config';
import { SettingsModule } from './settings/settings.module';
import { SettingsService } from './settings/settings.types';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
// const session = require('express-session');

// const options = {
//   connectionLimit: 10,
//   password: 'donat_baza',
//   user: 'donat_baza',
//   database: 'donat_baza',
//   host: 'mysql',
//   port: 3306,
//   createDatabaseTable: true
// }

// const mysqlStore = require('express-mysql-session')(session);
// const sessionStore = new mysqlStore(options);

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    // SessionModule.forRoot({
    // session: { secret: 'keyboard cat', saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 60 * 24}, rolling: true },
    // }),
    SequelizeModule.forRootAsync({
      useFactory: (settingsService: SettingsService) => ({
        dialect: 'mysql',
        host: settingsService.getDbVars().host,
        port: settingsService.getDbVars().port,
        username: 'root',
        password: settingsService.getDbVars().password,
        database: settingsService.getDbVars().name,
        models: [],
      })
    }),
    MikroOrmModule.forRoot(config),
    SettingsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
