import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './setup-swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { WinstonModule } from 'nest-winston';
import { instance } from './winston.logger';
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  if (process.env.ENABLE_DOCUMENTATION == '1') {
    setupSwagger(app);
  }
  await app.listen(process.env.PORT);
}
bootstrap();
