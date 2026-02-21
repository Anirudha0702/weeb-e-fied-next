import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nestdb',

  autoLoadEntities: true,

  ssl: process.env.DB_CA
    ? {
        ca: process.env.DB_CA.replace(/\\n/g, '\n'),
        rejectUnauthorized: true,
      }
    : false,

  logging: true,
  synchronize: false,
}));
