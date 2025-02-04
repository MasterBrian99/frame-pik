import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CollectionUserEntity } from './collection-user.entity';
import { AlbumEntity } from './album.entity';

@Entity({ name: 'collection' })
export class CollectionEntity extends BaseEntity {
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

  @OneToMany(() => CollectionUserEntity, (cu) => cu.collection)
  collectionUser: CollectionUserEntity[];
  @OneToMany(() => AlbumEntity, (a) => a.collection)
  albums: AlbumEntity[];
}
