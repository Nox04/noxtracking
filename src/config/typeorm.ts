import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'noxtracking',
  entities:
    process.env.NODE_ENV === 'development'
      ? [__dirname + '/../**/*.entity.{js,ts}']
      : ['dist/**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true
};