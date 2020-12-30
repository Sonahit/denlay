import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
  constructor(msg = 'errors.http.401', code = 401) {
    super(msg, code);
  }
}
