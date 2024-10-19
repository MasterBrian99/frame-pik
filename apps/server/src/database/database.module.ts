import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { WallEntity } from './entity/wall.entity';
import { WallCollaboratorEntity } from './entity/wall-collaborator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WallEntity, WallCollaboratorEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
