import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as imageThumbnail from 'image-thumbnail';
@Injectable()
export class ThumbnailGenerateService {
  @OnEvent('generate.image-thumbnail')
  async generateImageThumbnail(
    filePath: string,
    width: number,
    height: number,
  ) {}
}
