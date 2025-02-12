import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
import * as path from 'path';
import { TypedEventEmitter } from '../event-emitter/typed-event-emitter.class';
import * as mime from 'mime-types';
import { ERROR_MESSAGES } from '../../utils/error-messages';
@Injectable()
export class StorageService {
  private readonly storagePath: string;
  private readonly collectionsRoot: string;
  private readonly profileImageRoot: string;
  private readonly thumbnailRoot: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    this.storagePath = path.resolve(configService.get<string>('STORAGE_PATH'));
    this.collectionsRoot = 'collections';
    this.profileImageRoot = 'profile-images';
    this.thumbnailRoot = '_thumbnails';
  }

  async initializeUserStorage(userId: string): Promise<void> {
    await Promise.all([
      this.createUserRootFolder(userId),
      this.createCollectionsFolder(userId),
      this.createProfileImagesFolder(userId),
    ]);
  }
  async createUserRootFolder(userId: string): Promise<void> {
    await this.ensureDirectory(path.join(this.storagePath, userId));
  }
  async createCollectionsFolder(userId: string): Promise<void> {
    await this.ensureDirectory(
      path.join(this.storagePath, userId, this.collectionsRoot),
    );
  }
  async createProfileImagesFolder(userId: string): Promise<void> {
    await this.ensureDirectory(
      path.join(this.storagePath, userId, this.profileImageRoot),
    );
  }

  private async ensureDirectory(path: string): Promise<void> {
    try {
      await fs.ensureDir(path);
      this.logger.log(`Directory ensured: ${path}`);
    } catch (error) {
      this.logger.error(`Failed to create directory: ${path}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to create directory: ${path}`,
      );
    }
  }
  private async writeFile(params: {
    path: string;
    buffer: Buffer;
  }): Promise<void> {
    try {
      await fs.writeFile(params.path, params.buffer);
      this.logger.log(`File written: ${params.path}`);
    } catch (error) {
      this.logger.error(`Failed to write file: ${params.path}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to write file: ${params.path}`,
      );
    }
  }
  async getProfileImage(ownerId: string, fileName: string) {
    const folderPath = path.join(
      this.storagePath,
      ownerId,
      this.profileImageRoot,
    );
    const filePath = path.join(folderPath, fileName);
    if (!fs.pathExistsSync(filePath)) {
      return {
        filePath: null,
        mimeType: null,
      };
    }
    const mimeType = mime.contentType(path.extname(filePath));

    return {
      filePath,
      mimeType,
    };
  }
  async getCollectionThumbnail(
    ownerId: string,
    collectionPath: string,
    thumbnailPath: string,
  ) {
    const folderPath = path.join(
      this.storagePath,
      ownerId,
      this.collectionsRoot,
      collectionPath,
      this.thumbnailRoot,
    );
    const filePath = path.join(folderPath, thumbnailPath);
    if (!fs.pathExistsSync(filePath)) {
      return {
        filePath: null,
        mimeType: null,
      };
    }
    const mimeType = mime.contentType(path.extname(filePath));

    return {
      filePath,
      mimeType,
    };
  }

  private async validateFileExists(filePath: string): Promise<void> {
    if (!(await fs.pathExists(filePath))) {
      throw new NotFoundException(ERROR_MESSAGES.PROFILE_IMAGE_NOT_FOUND);
    }
  }

  // private async initCollectionsFolder() {
  //   const collectionsFolder = this._getCollectionPath();
  //   if (!fs.existsSync(collectionsFolder)) {
  //     await fs.ensureDir(collectionsFolder);
  //   }
  // }

  async createUserCollectionFolder(
    folderName: string,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<void> {
    const folderPath = path.join(
      this.storagePath,
      userId,
      'collections',
      folderName,
    );
    const thumbnailFolder = path.join(folderPath, '_thumbnails');
    try {
      await fs.ensureDir(folderPath);
      await fs.ensureDir(thumbnailFolder);
      this.logger.log(`Folder created: ${folderPath}`);
      if (file) {
        const imgePath = path.join(thumbnailFolder, file.originalname);
        await this.writeFile({
          path: imgePath,
          buffer: file.buffer,
        });
      }
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
  async createNewProfileImage(ownerId: string, file: Express.Multer.File) {
    const folderPath = path.join(
      this.storagePath,
      ownerId,
      this.profileImageRoot,
    );
    const filePath = path.join(folderPath, file.originalname);
    try {
      // await fs.copyFile(file.path, path.join(folderPath, file.originalname));
      await fs.writeFile(filePath, file.buffer);
      this.logger.log(`File created: ${filePath}`);
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
}
