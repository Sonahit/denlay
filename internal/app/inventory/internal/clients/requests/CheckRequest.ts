import { BaseRequest } from './BaseRequest';

export interface CheckRequest extends BaseRequest<'check'> {
  jwt: string;
}
