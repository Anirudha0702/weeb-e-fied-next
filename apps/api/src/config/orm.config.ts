import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export const getTypeOrmConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: parseInt(config.get('DB_PORT') ?? '5432', 10),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  logging: true,
  ssl: {
    ca: config.get('DB_CA'),
    rejectUnauthorized: true,
  },
  synchronize: true, // Recommended to control sync via env
});
