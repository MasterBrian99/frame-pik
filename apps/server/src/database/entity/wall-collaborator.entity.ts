import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { WallEntity } from './wall.entity';
import { COLLABORATOR_ROLE } from 'src/utils/constant';

@Entity('wall_collaborator')
export class WallCollaboratorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.wallCollaborator)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => WallEntity, (w) => w.wallCollaborator)
  @JoinColumn({ name: 'wall_id' })
  wall: WallEntity;

  @Column({
    type: 'enum',
    enum: COLLABORATOR_ROLE,
    default: COLLABORATOR_ROLE.USER,
    name: 'collaborator_role',
  })
  collaboratorRole: COLLABORATOR_ROLE;
}
