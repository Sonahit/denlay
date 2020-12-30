import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(msg = 'errors.http.400', code = 400) {
    super(msg, code);
  }
}
