import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
import * as path from 'path';
@Injectable()
export class StorageService {
  private readonly storagePath: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    this.storagePath = path.resolve(configService.get<string>('STORAGE_PATH'));
    this.initCollectionsFolder();
  }

  private async initCollectionsFolder() {
    const collectionsFolder = this._getCollectionPath();
    if (!fs.existsSync(collectionsFolder)) {
      await fs.ensureDir(collectionsFolder);
    }
  }
  private _getCollectionPath(): string {
    return path.join(this.storagePath, 'collections');
  }

  private _fullPath(filePath: string): string {
    return path.join(this.storagePath, filePath);
  }

  async createFolderCollection(
    folderName: string,
    userId: string,
  ): Promise<void> {
    const folderPath = path.join(this._getCollectionPath(), userId, folderName);
    try {
      await fs.ensureDir(folderPath);
      this.logger.log(`Folder created: ${folderPath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating folder: ${folderPath}`,
      );
    }
  }
  async createFolder(folderName: string): Promise<void> {
    const folderPath = path.join(this.storagePath, folderName);
    try {
      await fs.ensureDir(folderPath);
      this.logger.log(`Folder created: ${folderPath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating folder: ${folderPath}`,
      );
    }
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      return await fs.pathExists(this._fullPath(filePath));
    } catch (err) {
      throw new Error(
        `Error checking if file exists: ${this._fullPath(filePath)}`,
      );
    }
  }
}
