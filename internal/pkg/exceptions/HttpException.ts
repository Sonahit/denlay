export class HttpException extends Error {
  constructor(msg: string, public statusCode: number) {
    super(msg);
  }
}
