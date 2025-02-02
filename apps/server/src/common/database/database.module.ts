import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { UserEntity } from './entity/user.entity';
import { CollectionEntity } from './entity/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CollectionEntity])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
