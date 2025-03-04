import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './integrations/database/database.config';
import { DatabaseModule } from './integrations/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { UserModule } from './core/user/user.module';
import { ClsModule } from 'nestjs-cls';
import { CollectionModule } from './core/collection/collection.module';
import { StorageModule } from './integrations/storage/storage.module';
import { AlbumModule } from './core/album/album.module';
import { SnapModule } from './core/snap/snap.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThumbnailGenerateModule } from './integrations/thumbnail-generate/thumbnail-generate.module';
import { TypedEventEmitterModule } from './integrations/event-emitter/typed-event-emitter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CdnModule } from './core/cdn/cdn.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client-build'),
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    EventEmitterModule.forRoot(),
    TypedEventEmitterModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => {
        return dbConfig;
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    UserModule,
    CollectionModule,
    StorageModule,
    AlbumModule,
    SnapModule,
    ThumbnailGenerateModule,
    CdnModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
