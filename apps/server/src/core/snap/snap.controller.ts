import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { SnapService } from './snap.service';
import { CreateSnapDto } from './dto/create-snap.dto';
import { UpdateSnapDto } from './dto/update-snap.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterceptor as CustomFileInterceptor } from '../../common/interceptors/file.interceptor';
import { StandardResponse } from '../../utils/standard-response';
import { SUCCESS_MESSAGES } from '../../utils/success-messages';
import { Auth } from '../../common/decorators/auth/http.decorators';
import { RoleType } from '../../utils/constants';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { AuthUser } from '../../common/decorators/auth/auth-user.decorator';
@Controller('snap')
export class SnapController {
  constructor(private readonly snapService: SnapService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @UseInterceptors(FileInterceptor('file'), CustomFileInterceptor)
  @Post('single')
  async create(
    @AuthUser() user: UserEntity,
    @Body() createSnapDto: CreateSnapDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = await this.snapService.createSingle(
        user,
        file,
        createSnapDto,
      );
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get()
  findAll() {
    return this.snapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnapDto: UpdateSnapDto) {
    return this.snapService.update(+id, updateSnapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snapService.remove(+id);
  }
}
