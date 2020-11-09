import { Response } from './Response';

export interface ErrorResponse<T = any> extends Response {
  errors?: T;
}
