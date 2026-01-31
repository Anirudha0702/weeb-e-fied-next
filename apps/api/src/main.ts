import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AppLogger } from './common/logger/app.logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(AppLogger);
  app.useLogger(logger);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const origins =
    process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) ?? [];
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
