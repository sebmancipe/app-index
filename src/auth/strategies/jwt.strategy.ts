import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PassportStrategies } from '@/auth/strategies';
import { ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.Jwt,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
