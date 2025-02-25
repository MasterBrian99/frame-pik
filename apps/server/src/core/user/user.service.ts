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
      await this.storageService.createNewProfileImage(user.username, file);
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
    console.log(user);

    try {
      if (user.profileImage === null) {
        return {
          filePath: null,
          mimeType: null,
        };
      }
      const filePath = await this.storageService.getProfileImage(
        user.username,
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
