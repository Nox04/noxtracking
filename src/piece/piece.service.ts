import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PieceRepository } from './piece.repository';
import { Piece } from './piece.entity';
import { SaveProgressDto } from './dto/save-progress.dto';
import { RatePieceDto } from './dto/rate-piece.dto';

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private pieceRepository: PieceRepository,
  ) {}

  findBySlug(slug: string): Promise<Piece> {
    return this.pieceRepository.findOne({
      where: { slug },
      relations: ['collections', 'userToPieces'],
    });
  }

  findById(id: string): Promise<Piece> {
    return this.pieceRepository.findOne(id);
  }

  async saveProgressOnPiece(
    saveProgressDto: SaveProgressDto,
    pieceId: string,
    userId: string,
  ): Promise<boolean> {
    return this.pieceRepository.addOrEditPieceProgress(saveProgressDto, pieceId, userId);
  }

  async ratePiece(
    ratePieceDto: RatePieceDto,
    pieceId: string,
    userId: string,
  ): Promise<boolean> {
    return this.pieceRepository.ratePiece(ratePieceDto, pieceId, userId);
  }
}
