import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { COLLECTION_ROLE } from '../../../utils/constants';

@Entity({ name: 'collection_user' })
export class CollectionUserEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.collectionUser)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CollectionEntity, (c) => c.collectionUser)
  @JoinColumn({ name: 'collection_id' })
  collection: CollectionEntity;

  @Column({
    name: 'role_type',
    type: 'varchar',
    length: 10,
  })
  role: string;
}
