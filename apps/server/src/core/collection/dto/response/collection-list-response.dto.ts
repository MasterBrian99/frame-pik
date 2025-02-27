import { CollectionEntity } from '../../../../integrations/database/entity/collection.entity';

export default class CollectionListResponseDto {
  collections: CollectionEntity[];

  constructor(collections: CollectionEntity[]) {
    this.collections = collections;
  }
  getResponse() {
    return this.collections.map((c) => {
      return {
        id: c.id,
        name: c.name,
        description: c.description,
        albumCount: c.albumCount,
        views: c.views,
        thumbnailAvaliable: c.thumbnailPath !== null,
        thumbnailPath: c.thumbnailPath,
      };
    });
  }
}
