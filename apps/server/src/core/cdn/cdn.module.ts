import { Module } from '@nestjs/common';
import { CdnService } from './cdn.service';
import { CdnController } from './cdn.controller';
import { DatabaseModule } from 'src/integrations/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CdnController],
  providers: [CdnService],
})
export class CdnModule {}
