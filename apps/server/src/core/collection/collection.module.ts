import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { DatabaseModule } from '../../integrations/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
