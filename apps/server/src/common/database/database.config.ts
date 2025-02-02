import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { UserEntity } from './entity/user.entity';

dotenv.config({
  path: '.env',
  debug: true,
});

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT) || 5432,
    database: process.env.DATABASE_NAME,
    entities: [UserEntity],
    logging:
      process.env.NODE_ENV === 'development' ||
      process.env.DATABASE_QUERY_LOGGING === '1',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/src/common/database/migrations/*.js'],
  }),
);

// export default registerAs(
//   'database',
//   (): TypeOrmModuleOptions => ({
//     type: 'postgres',
//     url: process.env.DATABASE_URL,
//     autoLoadEntities: true,
//     logging:
//       process.env.NODE_ENV === 'development' ||
//       process.env.DATABASE_QUERY_LOGGING === '1',
//     // In production, you might want to run migrations differently
//     // (e.g. not automatically on app start)
//     // migrationsRun: false,
//     migrations: ['dist/src/database/migrations/*.js'],
//     namingStrategy: new SnakeNamingStrategy(),
//     // Enable synchronize to auto-create tables, handy during initial development
//     // Use migrations to manage database changes thereafter
//     // (once you have a production database / initial release ready)
//     // synchronize: process.env.NODE_ENV === 'development',
//   }),
// );
