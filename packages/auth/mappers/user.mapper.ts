import { User } from '../database/models/user.entity';
import { UserDto } from '../database/dto/user.dto';

export default {
  toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
    };
  },
};
