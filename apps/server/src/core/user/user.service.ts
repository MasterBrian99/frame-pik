import {
  Injectable,
  InternalServerErrorException,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserEntity } from 'src/integrations/database/entity/user.entity';
import { StorageService } from 'src/integrations/storage/storage.service';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as mime from 'mime-types';
import * as path from 'path';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly storageService: StorageService,
  ) {}
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  async addProfileImage(file: Express.Multer.File, user: UserEntity) {
    this.logger.log(user);
    try {
      await this.storageService.createNewProfileImage(user.code, file);
      await this.userRepository.update(user.id, {
        profileImage: file.originalname,
      });
      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getProfileImage(user: UserEntity) {
    try {
      const filePath = await this.storageService.getProfileImage(
        user.code,
        user.profileImage,
      );

      return {
        filePath: filePath.filePath,
        mimeType: filePath.mimeType,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
