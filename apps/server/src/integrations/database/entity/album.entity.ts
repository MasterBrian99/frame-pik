import {
  Collection,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CollectionEntity } from './collection.entity';

@Entity({ name: 'album' })
export class AlbumEntity extends BaseEntity {
  @Column({ name: 'name', length: 255, nullable: false, type: 'varchar' })
  name: string;

  @Column({
    name: 'folder_name',
    length: 255,
    nullable: false,
    type: 'varchar',
  })
  folderName: string;

  @Column({
    name: 'description',
    nullable: true,
    type: 'text',
  })
  description: string;

  @ManyToOne(() => CollectionEntity, (c) => c.albums)
  @JoinColumn({
    name: 'collection_id',
  })
  collection: CollectionEntity;
}
