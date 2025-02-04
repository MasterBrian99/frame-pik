import { Entity, Column, OneToMany, Collection } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleType } from 'src/utils/constants';
import { CollectionUserEntity } from './collection-user.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({
    name: 'email',
    length: 255,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  email: string;
  @Column({ name: 'password', nullable: true, type: 'text' })
  password: string;

  @Column({ name: 'name', length: 255, nullable: false, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: RoleType.USER, length: 20 })
  role!: string;

  @Column({ name: 'code', nullable: false, type: 'text', unique: true })
  code: string;
  @OneToMany(() => CollectionUserEntity, (cu) => cu.user)
  collectionUser: CollectionUserEntity[];
}
