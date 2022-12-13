import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DBEnum } from 'src/enum/config.enum';

export function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

export function getServerConfig() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  const config = { ...defaultConfig, ...envConfig };
  return config;
}

// 通過 env 來解析不同配置
export function buildConnectionOptions() {
  const config = getServerConfig();
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.js,.ts}'];

  return {
    type: config[DBEnum.DB_TYPE],
    host: config[DBEnum.DB_HOST],
    port: config[DBEnum.DB_PORT],
    username: config[DBEnum.DB_USERNAME],
    password: config[DBEnum.DB_PASSWORD],
    database: config[DBEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: true,
  } as TypeOrmModuleOptions;
}

export const connection = buildConnectionOptions();

export default new DataSource({
  ...connection,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
