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
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { StandardResponse } from 'src/common/utils/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { RoleType } from 'src/utils/constants';
import { Auth } from 'src/common/decorators/auth/http.decorators';
import { UserEntity } from 'src/common/database/entity/user.entity';
import { AuthUser } from 'src/common/decorators/auth/auth-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @Post()
  async create(
    @AuthUser() user: UserEntity,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    try {
      return new StandardResponse<void>(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.create(user, createCollectionDto),
      );
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
