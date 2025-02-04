import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailGenerateService } from './thumbnail-generate.service';

describe('ThumbnailGenerateService', () => {
  let service: ThumbnailGenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThumbnailGenerateService],
    }).compile();

    service = module.get<ThumbnailGenerateService>(ThumbnailGenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
