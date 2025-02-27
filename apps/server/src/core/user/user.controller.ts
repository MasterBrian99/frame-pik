import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser } from '../../common/decorators/auth/auth-user.decorator';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { StandardResponse } from '../../utils/standard-response';
import { SUCCESS_MESSAGES } from '../../utils/success-messages';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterceptor as CustomFileInterceptor } from '../../common/interceptors/file.interceptor';
import { Auth } from '../../common/decorators/auth/http.decorators';
import { RoleType } from '../../utils/constants';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @UseInterceptors(FileInterceptor('file'), CustomFileInterceptor)
  @Post('profile-image')
  async addProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user: UserEntity,
  ) {
    try {
      const data = await this.userService.addProfileImage(file, user);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
  @Auth([RoleType.ADMIN, RoleType.USER])
  @Get('profile-image')
  async getProfileImage(
    @Res({ passthrough: true }) res: Response,
    @AuthUser() user: UserEntity,
  ) {
    try {
      const data = await this.userService.getProfileImage(user);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
}
