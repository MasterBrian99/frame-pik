import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UserEntity } from 'src/common/database/entity/user.entity';
import { AuthUser } from 'src/common/decorators/auth/auth-user.decorator';
import { Auth } from 'src/common/decorators/auth/http.decorators';
import { RoleType } from 'src/utils/constants';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @Post()
  async create(
    @AuthUser() user: UserEntity,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.create(user, createAlbumDto);
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
