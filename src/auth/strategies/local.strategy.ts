import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UserDto } from '@/user/dto/user.dto';
import { UserLogInException } from '@/auth/exception';
import { PassportStrategies } from '@/auth/strategies';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.Local,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw UserLogInException.userMissingOrPasswordMismatch();
    }

    return user;
  }
}
