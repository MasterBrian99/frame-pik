import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapController } from './snap.controller';
import { DatabaseModule } from 'src/integrations/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SnapController],
  providers: [SnapService],
})
export class SnapModule {}
