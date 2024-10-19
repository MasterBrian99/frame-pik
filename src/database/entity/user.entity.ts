import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'email', length: 255, nullable: false, type: 'varchar' })
  email: string;
  @Column({ name: 'password', nullable: true, type: 'text' })
  password: string;

  @Column({ name: 'name', length: 255, nullable: false, type: 'varchar' })
  name: string;
}
