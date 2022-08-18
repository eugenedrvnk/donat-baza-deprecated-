import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { AuthModule } from './auth/auth.module';
const session = require('express-session');

const options = {
  connectionLimit: 10,
  password: 'donat_baza',
  user: 'donat_baza',
  database: 'donat_baza',
  host: 'mysql',
  port: 3306,
  createDatabaseTable: true
}

const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(options);

@Module({
  imports: [
    AuthModule,
    SessionModule.forRoot({
      session: { secret: 'keyboard cat', saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 60 * 24}, store: sessionStore, rolling: true },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
