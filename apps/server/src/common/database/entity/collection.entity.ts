import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ContextProvider } from 'src/common/providers/context.provider';

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

  @ManyToOne(() => UserEntity, (user) => user.collections)
  @JoinColumn({ name: 'collection_user' })
  collectionUser: UserEntity;

  @BeforeInsert()
  setCollectionUser() {
    const user = ContextProvider.getAuthUser();

    if (user) {
      this.collectionUser = user;
    }
  }
}
