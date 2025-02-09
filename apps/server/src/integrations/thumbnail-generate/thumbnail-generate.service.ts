import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as imageThumbnail from 'image-thumbnail';
import * as fs from 'fs-extra';
import * as path from 'path';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ThumbnailGenerateService {
  constructor(private readonly storageService: StorageService) {}
  @OnEvent('generate.image-thumbnail')
  async generateImageThumbnail({ filePath }: { filePath: string }) {
    const imageBuffer = fs.readFileSync(filePath);
    const thumbnail = await imageThumbnail(imageBuffer);
    this.storageService.saveThumbnail(thumbnail, filePath);
    // fs.writeFileSync(path.join(folderPath, 'random.png'), thumbnail);
    // console.log(thumbnail);
  }
}
