import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionEntity } from 'src/integrations/database/entity/collection.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { Transactional } from 'typeorm-transactional';
import { StorageService } from 'src/integrations/storage/storage.service';
import { UserEntity } from 'src/integrations/database/entity/user.entity';
import { CollectionUserEntity } from 'src/integrations/database/entity/collection-user.entity';
import { COLLECTION_ROLE } from 'src/utils/constants';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionEntityRepository: Repository<CollectionEntity>,
    @InjectRepository(CollectionUserEntity)
    private readonly collectionUserEntityRepository: Repository<CollectionUserEntity>,
    private readonly storageService: StorageService,
  ) {}
  @Transactional()
  async create(
    currentUser: UserEntity,
    createCollectionDto: CreateCollectionDto,
  ) {
    if (!currentUser) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const existByName = await this.collectionEntityRepository.findOne({
      where: { name: createCollectionDto.name },
    });
    // this.logger.log(existByName.name);
    if (existByName) {
      throw new BadRequestException(
        ERROR_MESSAGES.COLLECTION_NAME_ALREADY_EXIST,
      );
    }
    const existByFolderName = await this.collectionEntityRepository.findOne({
      where: { folderName: createCollectionDto.folderName },
    });
    if (existByFolderName) {
      throw new BadRequestException(
        ERROR_MESSAGES.COLLECTION_FOLDER_NAME_ALREADY_EXIST,
      );
    }
    try {
      await this.storageService.createUserCollectionFolder(
        createCollectionDto.folderName,
        currentUser.code,
      );
      const collection = new CollectionEntity();
      collection.name = createCollectionDto.name;
      collection.folderName = createCollectionDto.folderName;
      collection.description = createCollectionDto.description;
      const savedCollection =
        await this.collectionEntityRepository.save(collection);
      const collectionUserEntity = new CollectionUserEntity();
      collectionUserEntity.collection = savedCollection;
      collectionUserEntity.user = currentUser;
      collectionUserEntity.role = COLLECTION_ROLE.OWNER;
      await this.collectionUserEntityRepository.save(collectionUserEntity);
      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
