import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/request/create-collection.dto';
import { UpdateCollectionDto } from './dto/request/update-collection.dto';
import { StandardResponse } from '../../utils/standard-response';
import { SUCCESS_MESSAGES } from '../../utils/success-messages';
import { RoleType } from '../../utils/constants';
import { Auth } from '../../common/decorators/auth/http.decorators';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { AuthUser } from '../../common/decorators/auth/auth-user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterceptor as CustomFileInterceptor } from '../../common/interceptors/file.interceptor';
import GetUserCollectionDto from './dto/request/get-user-collection.do';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
@ApiTags('collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @Auth([RoleType.ADMIN, RoleType.USER])
  @UseInterceptors(FileInterceptor('file'), CustomFileInterceptor)
  @Post()
  async create(
    @AuthUser() user: UserEntity,
    @Body() createCollectionDto: CreateCollectionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return new StandardResponse<void>(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.COLLECTION_CREATED,
        await this.collectionService.create(user, createCollectionDto, file),
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: 'get all collection from current user',
  })
  @Auth([RoleType.ADMIN, RoleType.USER], {
    public: false,
  })
  @Get('current-user')
  async findAllCurrentUser(
    @Query() pagination: GetUserCollectionDto,
    @AuthUser() user: UserEntity,
  ) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findAllCurrentUser(user, pagination),
      );
    } catch (e) {
      throw e;
    }
  }
  // @Auth([RoleType.ADMIN, RoleType.USER], {
  //   public: false,
  // })
  // @Get('thumbnail/:id')
  // async getCollectionThumbnail(
  //   @Res({ passthrough: true }) res: Response,
  //   @AuthUser() user: UserEntity,
  //   @Param('id') id: string,
  // ) {
  //   try {
  //     const data = await this.collectionService.getCollectionThumbnail(
  //       user,
  //       id,
  //     );
  //     if (data.filePath === null) {
  //       const emptyStream = new Readable({
  //         read() {
  //           this.push(null); // End the stream
  //         },
  //       });
  //       return new StreamableFile(emptyStream);
  //     }
  //     res.set({
  //       'Content-Type': data.mimeType,
  //     });
  //     const file = createReadStream(data.filePath);
  //     return new StreamableFile(file);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
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
