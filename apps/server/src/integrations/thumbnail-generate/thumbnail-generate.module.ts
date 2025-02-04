import { Module } from '@nestjs/common';
import { ThumbnailGenerateService } from './thumbnail-generate.service';

@Module({
  providers: [ThumbnailGenerateService],
  exports: [ThumbnailGenerateService],
})
export class ThumbnailGenerateModule {}
