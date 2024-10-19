import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { WallEntity } from './wall.entity';
import { COLLABORATOR_ROLE } from 'src/utils/constant';

@Entity('wall_collaborator')
export class WallCollaboratorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.wallCollaborator)
  user: UserEntity;

  @ManyToOne(() => WallEntity, (w) => w.wallCollaborator)
  wall: WallEntity;

  @Column({
    type: 'enum',
    enum: COLLABORATOR_ROLE,
    default: COLLABORATOR_ROLE.USER,
  })
  collaboratorRole: COLLABORATOR_ROLE;
}
