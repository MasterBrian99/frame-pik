import { CollectionEntity } from 'src/integrations/database/entity/collection.entity';

export class CollectionItemResponseDto {
  id: number;
  name: string;
  description: string;
  albumCount: number;
  views: number;
  thumbnailAvaliable: boolean;
  thumbnailPath: string;
  constructor(collection: CollectionEntity) {
    this.id = collection.id;
    this.name = collection.name;
    this.description = collection.description;
    this.albumCount = collection.albumCount;
    this.views = collection.views;
    this.thumbnailAvaliable = collection.thumbnailPath !== null;
    this.thumbnailPath = collection.thumbnailPath;
  }
}
