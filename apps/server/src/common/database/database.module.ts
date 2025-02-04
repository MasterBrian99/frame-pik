import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CollectionEntity } from './entity/collection.entity';
import { CollectionUserEntity } from './entity/collection-user.entity';
import { AlbumEntity } from './entity/album.entity';
import { SnapEntity } from './entity/snap.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CollectionEntity,
      CollectionUserEntity,
      AlbumEntity,
      SnapEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
