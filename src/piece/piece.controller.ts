import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { PieceService } from './piece.service';
import { Piece } from './piece.entity';

@Controller('piece')
@UseInterceptors(ClassSerializerInterceptor)
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}

  @Get('/slug/:slug')
  getPieceBySlug(
    @Param('slug') id: string,
  ): Promise<Piece> {
    return this.pieceService.findBySlug(id);
  }

}
