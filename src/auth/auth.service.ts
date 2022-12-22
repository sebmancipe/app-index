
import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { Hasher } from '@/user/hasher/hasher';
import { UserDto } from '@/user/dto/user.dto';
import { AccessToken } from '@/auth/dto/output.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly hasher: Hasher,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.usersService.getUser(username);

    if (user && await this.hasher.same(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: UserDto): Promise<AccessToken> {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
