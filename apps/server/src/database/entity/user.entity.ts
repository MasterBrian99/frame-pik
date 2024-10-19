import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleType } from 'src/utils/role-type';
import { WallCollaboratorEntity } from './wall-collaborator.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'email', length: 255, nullable: false, type: 'varchar' })
  email: string;
  @Column({ name: 'password', nullable: true, type: 'text' })
  password: string;

  @Column({ name: 'name', length: 255, nullable: false, type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @OneToMany(() => WallCollaboratorEntity, (w) => w.user)
  wallCollaborator: WallCollaboratorEntity[];
}
