import { ContextProvider } from '../../../integrations/providers/context.provider';
import { STATUS } from '../../../utils/constants';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 10,
    default: STATUS.ACTIVE,
  })
  status: string;

  @Column({ name: 'created_by', type: 'bigint', nullable: true })
  createdBy: number;
  @Column({ name: 'updated_by', type: 'bigint', nullable: true })
  updatedBy: number;
  @BeforeInsert()
  setCreatedBy() {
    const user = ContextProvider.getAuthUser();

    if (user) {
      this.createdBy = user.id;
    }
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
  @BeforeUpdate()
  setUpdatedBy() {
    const user = ContextProvider.getAuthUser();
    if (user) {
      this.updatedBy = user.id;
    }
  }
}
