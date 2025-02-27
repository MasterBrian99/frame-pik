import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CdnService } from './cdn.service';
import { CreateCdnDto } from './dto/create-cdn.dto';
import { UpdateCdnDto } from './dto/update-cdn.dto';
import { ImageCdnDto } from './dto/request/image-cdn.dto';
import { Response } from 'express';
import { StandardResponse } from 'src/utils/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';

@Controller('cdn')
export class CdnController {
  constructor(private readonly cdnService: CdnService) {}

  @Post()
  create(@Body() createCdnDto: CreateCdnDto) {
    return this.cdnService.create(createCdnDto);
  }

  @Get('collection-image/:filePath')
  async getCollectionImage(
    @Param('filePath') filePath: string,
    @Query() imageCdnQuery: ImageCdnDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.cdnService.getCollectionImage(
        filePath,
        imageCdnQuery,
        res,
      );
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get('profile-image/:filePath')
  async getProfileImage(
    @Param('filePath') filePath: string,
    @Query() imageCdnQuery: ImageCdnDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.cdnService.getProfileImage(
        filePath,
        imageCdnQuery,
        res,
      );
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cdnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCdnDto: UpdateCdnDto) {
    return this.cdnService.update(+id, updateCdnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cdnService.remove(+id);
  }
}
