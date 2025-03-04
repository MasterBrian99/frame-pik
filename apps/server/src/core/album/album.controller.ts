import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { AuthUser } from '../../common/decorators/auth/auth-user.decorator';
import { Auth } from '../../common/decorators/auth/http.decorators';
import { RoleType } from '../../utils/constants';
import { StandardResponse } from '../../utils/standard-response';
import { SUCCESS_MESSAGES } from '../../utils/success-messages';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @Post()
  async create(
    @AuthUser() user: UserEntity,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    try {
      return new StandardResponse<void>(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.SUCCESS,
        await this.albumService.create(user, createAlbumDto),
      );
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
