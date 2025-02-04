import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CollectionUserEntity } from 'src/integrations/database/entity/collection-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/integrations/database/entity/user.entity';
import { COLLECTION_ROLE } from 'src/utils/constants';
import { StorageService } from 'src/integrations/storage/storage.service';
import { AlbumEntity } from 'src/integrations/database/entity/album.entity';
import { ERROR_MESSAGES } from 'src/utils/error-messages';

@Injectable()
export class AlbumService {
  private readonly logger = new Logger(AlbumService.name);

  constructor(
    @InjectRepository(CollectionUserEntity)
    private readonly collectionUserEntityRepository: Repository<CollectionUserEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumEntityRepository: Repository<AlbumEntity>,
    private readonly storageService: StorageService,
  ) {}
  async create(user: UserEntity, createAlbumDto: CreateAlbumDto) {
    const existCollection = await this.collectionUserEntityRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        collection: {
          id: createAlbumDto.collectionId,
        },
      },
      relations: ['collection'],
    });
    if (!existCollection) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
    }

    const collectionOwner = await this.collectionUserEntityRepository.findOne({
      where: {
        collection: {
          id: existCollection.collection.id,
        },
        role: COLLECTION_ROLE.OWNER,
      },
      relations: ['user', 'collection'],
    });
    if (!collectionOwner) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
    }
    const exitsAlbumByName = await this.albumEntityRepository.findOne({
      where: {
        name: createAlbumDto.name,
      },
    });
    if (exitsAlbumByName) {
      throw new BadRequestException(ERROR_MESSAGES.ALBUM_NAME_ALREADY_EXIST);
    }

    const exitsAlbumByFolderName = await this.albumEntityRepository.findOne({
      where: {
        folderName: createAlbumDto.folderName,
      },
    });
    if (exitsAlbumByFolderName) {
      throw new BadRequestException(
        ERROR_MESSAGES.ALBUM_FOLDER_NAME_ALREADY_EXIST,
      );
    }
    try {
      await this.storageService.createFolderAlbum(
        collectionOwner.user.code,
        collectionOwner.collection.folderName,
        createAlbumDto.folderName,
      );
      const album = new AlbumEntity();
      album.name = createAlbumDto.name;
      album.folderName = createAlbumDto.folderName;
      album.description = createAlbumDto.description;
      album.collection = existCollection.collection;
      await this.albumEntityRepository.save(album);
      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all album`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
