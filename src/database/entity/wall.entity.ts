import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { WallCollaboratorEntity } from './wall-collaborator.entity';

@Entity('wall')
export class WallEntity extends BaseEntity {
  @Column({ name: 'name', length: 100, nullable: false, type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_public', type: 'boolean', nullable: false })
  isPublic: boolean;

  @OneToMany(() => WallCollaboratorEntity, (w) => w.wall)
  wallCollaborator: WallCollaboratorEntity[];
}
