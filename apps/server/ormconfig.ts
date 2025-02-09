import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/integrations/database/database.config';
import { DataSource } from 'typeorm';
ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});
export default new DataSource({
  ...databaseConfig(),
  entities: ['src/**/*.entity.ts'], // This is the important part
} as any);
