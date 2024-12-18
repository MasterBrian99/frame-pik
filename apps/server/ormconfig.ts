import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/database/entity/user.entity';
import { WallCollaboratorEntity } from 'src/database/entity/wall-collaborator.entity';
import { WallEntity } from 'src/database/entity/wall.entity';

dotenv.config();
export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity, WallCollaboratorEntity, WallEntity],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['src/database/migrations/*.{js,ts}'],
  migrationsTableName: 'history',
});
