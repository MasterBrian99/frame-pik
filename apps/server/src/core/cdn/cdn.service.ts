import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCdnDto } from './dto/create-cdn.dto';
import { UpdateCdnDto } from './dto/update-cdn.dto';
import { StorageService } from 'src/integrations/storage/storage.service';
import { ImageCdnDto } from './dto/request/image-cdn.dto';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { UserEntity } from 'src/integrations/database/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as sharp from 'sharp';
import { Response } from 'express';
import * as mime from 'mime-types';
import * as path from 'path';
import { IMAGE_FORMAT_TYPE } from 'src/utils/constants';

@Injectable()
export class CdnService {
  async getProfileImage(
    filePath: string,
    imageCdnQuery: ImageCdnDto,
    res: Response,
  ) {
    const user = await this.userRepository.findOne({
      where: { token: imageCdnQuery.token },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    if (!filePath) {
      throw new NotFoundException(ERROR_MESSAGES.IMAGE_NOT_FOUND);
    }
    try {
      const imagePath = await this.storageService.getProfileImage(
        user.username,
        filePath,
      );
      const image = this.processImage(imagePath, imageCdnQuery.format);
      this.streamImage(res, image, filePath);
    } catch (error) {
      this.logger.error(error);
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
  private readonly logger = new Logger(CdnService.name);

  constructor(
    private readonly storageService: StorageService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getCollectionImage(
    filePath: string,
    imageCdnQuery: ImageCdnDto,
    res: Response,
  ) {
    if (!filePath) {
      throw new NotFoundException(ERROR_MESSAGES.IMAGE_NOT_FOUND);
    }
    const user = await this.userRepository.findOne({
      where: { token: imageCdnQuery.token },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    try {
      const thumbnailPath = await this.storageService.getCollectionThumbnail(
        user.username,
        filePath,
      );
      const image = this.processImage(thumbnailPath, imageCdnQuery.format);

      this.streamImage(res, image, filePath);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private processImage(
    thumbnailPath: string,
    format: string | undefined,
  ): sharp.Sharp {
    let image = sharp(thumbnailPath);

    switch (format) {
      case IMAGE_FORMAT_TYPE.THUMBNAIL:
        image = image.resize(200).jpeg({ quality: 90 });
        break;
      case IMAGE_FORMAT_TYPE.ORIGINAL:
        // No resizing needed for the original image
        break;
      default:
        // Default to thumbnail if no format is specified
        image = image.resize(100).jpeg({ quality: 80 });
        break;
    }

    return image;
  }
  private streamImage(
    res: Response,
    image: sharp.Sharp,
    filePath: string,
  ): void {
    const mimeType = mime.contentType(path.extname(filePath));
    res.set({
      'Cache-Control': 'public, max-age=31536000',
      Expires: new Date(Date.now() + 31536000000).toUTCString(), // 1 year from now
      ETag: path.parse(filePath).name, // Generate a unique ETag for the image
      'Last-Modified': new Date().toUTCString(), // Set to the last modified time of the image
      Vary: 'Accept',
      'Content-Type': mimeType,
    });

    image.pipe(res);
  }
  create(createCdnDto: CreateCdnDto) {
    return 'This action adds a new cdn';
  }

  findAll() {
    return `This action returns all cdn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cdn`;
  }

  update(id: number, updateCdnDto: UpdateCdnDto) {
    return `This action updates a #${id} cdn`;
  }

  remove(id: number) {
    return `This action removes a #${id} cdn`;
  }
}
