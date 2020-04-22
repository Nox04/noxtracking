import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CollectionModule } from './collection/collection.module';
import { PieceModule } from './piece/piece.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    CollectionModule,
    PieceModule
  ]
})
export class AppModule {}
