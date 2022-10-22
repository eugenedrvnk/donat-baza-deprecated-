import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  write(req, userId: number) {
    req.session.userId = userId;
  }

  read(req) {
    return req.session.userId;
  }
}
