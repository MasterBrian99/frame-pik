import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
