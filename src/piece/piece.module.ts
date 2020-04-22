import { Module } from '@nestjs/common';
import { PieceController } from './piece.controller';
import { PieceService } from './piece.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PieceRepository } from './piece.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PieceRepository]),
  ],
  controllers: [PieceController],
  providers: [PieceService],
  exports: [PieceService]
})
export class PieceModule {}
