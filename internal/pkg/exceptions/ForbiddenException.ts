import { HttpException } from './HttpException';

export class ForbiddenException extends HttpException {
  constructor(msg = 'errors.http.403', code = 403) {
    super(msg, code);
  }
}
