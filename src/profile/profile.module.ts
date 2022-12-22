import { AuthModule } from "@/auth/auth.module";
import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { ProfileController } from "@/profile/profile.controller";

@Module({
    imports: [UserModule, AuthModule],
    controllers: [ProfileController],
    providers: [],
  })
  export class ProfileModule {}