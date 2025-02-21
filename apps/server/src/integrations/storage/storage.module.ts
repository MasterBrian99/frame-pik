import { Global, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
@Global()
@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule implements OnModuleInit {
  private readonly logger = new Logger(StorageModule.name);

  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  onModuleInit() {
    const folderPath = path.resolve(
      this.configService.get<string>('STORAGE_PATH'),
    );

    if (!fs.existsSync(folderPath)) {
      throw new Error(`Critical folder missing: ${folderPath}`);
    }

    this.logger.log(`Storage folder exists: ${folderPath}`);
  }
}
