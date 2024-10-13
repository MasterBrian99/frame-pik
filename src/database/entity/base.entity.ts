import { STATUS } from 'src/utils/constant';
import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;
}
