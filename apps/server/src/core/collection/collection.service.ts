import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/request/create-collection.dto';
import { UpdateCollectionDto } from './dto/request/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionEntity } from '../../integrations/database/entity/collection.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../../utils/error-messages';
import { Transactional } from 'typeorm-transactional';
import { StorageService } from '../../integrations/storage/storage.service';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { CollectionUserEntity } from '../../integrations/database/entity/collection-user.entity';
import { COLLECTION_ROLE } from '../../utils/constants';
import GetUserCollectionDto from './dto/request/get-user-collection.do';
import { PageMetaDto } from '../../common/pagination/page-meta.dto';
import { PageDto } from '../../common/pagination/page.dto';
import CollectionListResponseDto from './dto/response/collection-list-response.dto';

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
    file: Express.Multer.File,
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
        currentUser.username,
        file,
      );
      const collection = new CollectionEntity();
      collection.name = createCollectionDto.name;
      collection.folderName = createCollectionDto.folderName;
      if (file) {
        collection.thumbnailPath = file.originalname;
      }
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

  async findAllCurrentUser(user: UserEntity, pagination: GetUserCollectionDto) {
    pagination.userId = String(user.id);

    return await this.findPaginated(pagination);
  }

  async findPaginated(pagination: GetUserCollectionDto) {
    const queryBuilder = this.collectionEntityRepository
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.collectionUser', 'collectionUser'); // Corrected relation name

    if (pagination.status) {
      queryBuilder.andWhere('collection.status = :status', {
        status: pagination.status,
      });
    }
    if (pagination.search) {
      // Combine search conditions into a single OR clause
      queryBuilder.andWhere(
        '(collection.name LIKE :search OR collection.description LIKE :search)',
        {
          search: `%${pagination.search}%`,
        },
      );
    }
    if (pagination.userId) {
      // Reference the user_id column directly
      queryBuilder.andWhere('collectionUser.user_id = :userId', {
        userId: pagination.userId,
      });
    }
    if (pagination.roleType) {
      queryBuilder.andWhere('collectionUser.role = :role', {
        role: pagination.roleType,
      });
    }

    queryBuilder
      .orderBy('collection.id', pagination.order)
      .skip(pagination.skip)
      .take(pagination.count);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pagination,
    });

    return new PageDto(
      new CollectionListResponseDto(entities).getResponse(),
      pageMetaDto,
    );
  }
  async getCollectionThumbnail(user: UserEntity, id: string) {
    const collection = await this.collectionEntityRepository.findOne({
      where: { id: Number(id) },
    });
    if (!collection) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
    }
    const collectionUser = await this.collectionUserEntityRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        collection: {
          id: collection.id,
        },
      },
    });
    if (!collectionUser) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
    }
    const thumbnail = await this.storageService.getCollectionThumbnail(
      user.username,
      collection.folderName,
      collection.thumbnailPath,
    );

    return {
      filePath: thumbnail.filePath,
      mimeType: thumbnail.mimeType,
    };
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
