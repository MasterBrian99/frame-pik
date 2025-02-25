import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';
import { UpdateSnapDto } from './dto/update-snap.dto';
import { AlbumEntity } from '../../integrations/database/entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../../integrations/storage/storage.service';
import { ERROR_MESSAGES } from '../../utils/error-messages';
import { CollectionEntity } from '../../integrations/database/entity/collection.entity';
import { CollectionUserEntity } from '../../integrations/database/entity/collection-user.entity';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { COLLECTION_ROLE } from '../../utils/constants';
import { TypedEventEmitter } from '../../integrations/event-emitter/typed-event-emitter.class';

@Injectable()
export class SnapService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumEntityRepository: Repository<AlbumEntity>,
    private readonly storageService: StorageService,
    @InjectRepository(CollectionEntity)
    private readonly collectionEntityRepository: Repository<CollectionEntity>,
    @InjectRepository(CollectionUserEntity)
    private readonly collectionUserEntityRepository: Repository<CollectionUserEntity>,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}
  async createSingle(
    currentUser: UserEntity,
    file: Express.Multer.File,
    createSnapDto: CreateSnapDto,
  ) {
    const album = await this.albumEntityRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.collection', 'collection')
      .leftJoinAndSelect('collection.collectionUser', 'collectionUser')
      .leftJoinAndSelect('collectionUser.user', 'user')
      .where('album.id = :albumId', { albumId: createSnapDto.albumId })
      .select([
        'album.id',
        'album.folderName',
        'collection.id',
        'collection.folderName',
        'collectionUser.id',
        'collectionUser.role',
        'user.id',
        'user.code',
      ])
      .getOne();

    if (!album) {
      throw new NotFoundException(ERROR_MESSAGES.ALBUM_NOT_FOUND);
    }

    const collectionUser = album.collection.collectionUser.find(
      (cu) => cu.user.id === currentUser.id,
    );

    if (!collectionUser) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
    }

    const collectionOwner = album.collection.collectionUser.find(
      (cu) => cu.role === COLLECTION_ROLE.OWNER,
    );

    if (!collectionOwner) {
      throw new NotFoundException(ERROR_MESSAGES.COLLECTION_OWNER_NOT_FOUND);
    }

    const filePath = await this.storageService.createNewSnap(
      collectionOwner.user.username,
      album.collection.folderName,
      album.folderName,
      file,
    );
    this.eventEmitter.emit('generate.image-thumbnail', {
      filePath,
    });
    return;
  }

  findAll() {
    return `This action returns all snap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snap`;
  }

  update(id: number, updateSnapDto: UpdateSnapDto) {
    return `This action updates a #${id} snap`;
  }

  remove(id: number) {
    return `This action removes a #${id} snap`;
  }
}
