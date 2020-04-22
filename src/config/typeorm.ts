import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'noxtracking',
  entities:
    process.env.NODE_ENV === 'development'
      ? [__dirname + '/../**/*.entity.{js,ts}']
      : ['dist/**/*.entity.{js,ts}'],
  synchronize: true
};
