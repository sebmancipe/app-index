import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserProfileLocationService } from '@/user/user.profile.location.service';

@Controller('v1/users')
export class UserController {
  constructor(
    private readonly userProfileLocationService: UserProfileLocationService
  ) {
  }

  @Post('/create')
  async create(
    @Body() dto: UserCreateDto
  ): Promise<unknown> {
    return await this.userProfileLocationService.createUserProfile(dto);
  }
}
