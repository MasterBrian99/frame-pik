import { Module } from '@nestjs/common';
import { WallService } from './wall.service';
import { WallController } from './wall.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WallController],
  providers: [WallService],
})
export class WallModule {}
