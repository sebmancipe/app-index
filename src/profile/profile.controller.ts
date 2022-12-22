import { AuthService } from '@/auth/auth.service';
import { PassportStrategies } from '@/auth/strategies';
import { UserProfileLocation } from '@/user/dto/output.dto';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserProfileLocationService } from '@/user/user.profile.location.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/profile')
export class ProfileController {
  constructor(
    private readonly userProfileLocationService: UserProfileLocationService,
    private readonly authService: AuthService,
  ) {}

  @Post('/create')
  async create(@Body() dto: UserCreateDto): Promise<UserProfileLocation> {
    return await this.userProfileLocationService.createUserProfile(dto);
  }

  @Post('/log-in')
  @UseGuards(AuthGuard(PassportStrategies.Local))
  async logIn(@Request() req): Promise<unknown> {
    return this.authService.login(req.user);
  }

  @Get()
  @UseGuards(AuthGuard(PassportStrategies.Jwt))
  async get(@Request() req): Promise<unknown> {
    return await this.userProfileLocationService.getUserProfileAndLocation(
      req.user.username,
    );
  }
}
