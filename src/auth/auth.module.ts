
import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { UserService } from '@/user/user.service';
import { Hasher } from '@/user/hasher/hasher';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600s' },
    })
  ],
  providers: [AuthService, LocalStrategy, UserService, Hasher, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}