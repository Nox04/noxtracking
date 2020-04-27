import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PieceRepository } from './piece.repository';
import { Piece } from './piece.entity';

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private pieceRepository: PieceRepository,
  ) {}

  findBySlug(slug: string): Promise<Piece> {
    return this.pieceRepository.findOne({
      where: { slug },
      relations: ['collections'],
    });
  }
}
