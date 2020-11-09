import { UserDto } from '~pkg/dto/user.dto';

export interface CheckResponse {
  response: UserDto | false;
}
