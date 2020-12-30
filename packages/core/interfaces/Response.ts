export interface Response<T = any> {
  status: boolean;

  code: number;

  message?: string;

  data?: T;
}
