import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClsModule } from 'nestjs-cls';
import { SnapModule } from './snap/snap.module';
import { WallModule } from './wall/wall.module';

@Module({
  imports: [
    DatabaseModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type:
          (configService.get<string>('DATABASE_TYPE') as 'postgres') ||
          'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        port: configService.get<number>('DATABASE_PORT'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/database/entity/*.entity{.ts,.js}'],
        synchronize: configService.get<number>('SYNC_MODE') == 1,
        logging: true,
      }),
    }),
    AuthModule,
    UserModule,
    SnapModule,
    WallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
