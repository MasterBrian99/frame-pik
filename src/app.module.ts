import { AppDataSource } from './../ormconfig';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
