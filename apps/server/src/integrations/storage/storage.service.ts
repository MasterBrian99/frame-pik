import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
import * as path from 'path';
import { TypedEventEmitter } from '../event-emitter/typed-event-emitter.class';
@Injectable()
export class StorageService {
  private readonly storagePath: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    this.storagePath = path.resolve(configService.get<string>('STORAGE_PATH'));
  }

  // private async initCollectionsFolder() {
  //   const collectionsFolder = this._getCollectionPath();
  //   if (!fs.existsSync(collectionsFolder)) {
  //     await fs.ensureDir(collectionsFolder);
  //   }
  // }

  async createUserFolders(userId: string): Promise<void> {
    const userFolder = path.join(this.storagePath, userId);
    const collectionsFolder = path.join(userFolder, 'collections');
    try {
      await fs.ensureDir(userFolder);
      await fs.ensureDir(collectionsFolder);
      this.logger.log(`Folder created: ${userFolder}`);
      this.logger.log(`Folder created: ${collectionsFolder}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating folder: ${userFolder}`,
      );
    }
  }
  private _getCollectionPath(): string {
    return path.join(this.storagePath, 'collections');
  }

  private _fullPath(filePath: string): string {
    return path.join(this.storagePath, filePath);
  }

  async createUserCollectionFolder(
    folderName: string,
    userId: string,
  ): Promise<void> {
    const folderPath = path.join(
      this.storagePath,
      userId,
      'collections',
      folderName,
    );
    try {
      await fs.ensureDir(folderPath);
      this.logger.log(`Folder created: ${folderPath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating folder: ${folderPath}`,
      );
    }
  }
  async createFolderAlbum(
    ownerId: string,
    collectionPath: string,
    albumPath: string,
  ) {
    const folderPath = path.join(
      this.storagePath,
      ownerId,
      'collections',
      collectionPath,
      albumPath,
    );
    try {
      await fs.ensureDir(folderPath);
      this.logger.log(`Folder created: ${folderPath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating folder: ${folderPath}`,
      );
    }
  }
  async createNewSnap(
    ownerId: string,
    collectionPath: string,
    albumPath: string,
    file: Express.Multer.File,
  ) {
    const folderPath = path.join(
      this.storagePath,
      ownerId,
      'collections',
      collectionPath,
      albumPath,
    );
    const filePath = path.join(folderPath, file.originalname);
    try {
      // await fs.copyFile(file.path, path.join(folderPath, file.originalname));
      await fs.writeFile(filePath, file.buffer);
      this.logger.log(`File created: ${filePath}`);
      // this.eventEmitter.emit('generate.image-thumbnail', {
      //   folderPath: folderPath,
      //   fileName: file.originalname,
      // });
      return filePath;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Error creating file: ${filePath}`,
      );
    }
  }
  async saveThumbnail(image: Buffer, filePath: string) {
    const folderPath = path.join(path.dirname(filePath), '.thumbnail');
    const fileName = path.basename(filePath);
    const thumbnailPath = path.join(folderPath, fileName);
    await fs.ensureDir(folderPath);
    await fs.writeFile(thumbnailPath, image);
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
