import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { StorageService } from '../../integrations/storage/storage.service';
import { ERROR_MESSAGES } from '../../utils/error-messages';
import { FindOptionsWhere, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
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
    const fileName = randomUUID() + path.extname(file.originalname);
    try {
      await this.storageService.createNewProfileImage(
        user.username,
        fileName,
        file,
      );
      await this.userRepository.update(user.id, {
        profileImage: fileName,
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
      return user.profileImage;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
