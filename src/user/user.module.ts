import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CollectionModule } from '../collection/collection.module';
import { PieceModule } from '../piece/piece.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    CollectionModule,
    PieceModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
