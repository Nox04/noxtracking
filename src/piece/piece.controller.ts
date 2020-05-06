import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PieceService } from './piece.service';
import { Piece } from './piece.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../auth/get-user.decorator';
import { RatePieceDto } from './dto/rate-piece.dto';
import { SaveProgressDto } from './dto/save-progress.dto';

@Controller('piece')
@UseInterceptors(ClassSerializerInterceptor)
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}

  @Get('/slug/:slug')
  getPieceBySlug(@Param('slug') slug: string): Promise<Piece> {
    return this.pieceService.findBySlug(slug);
  }

  @Get('/piece-status/:pieceSlug')
  @UseGuards(AuthGuard('jwt'))
  getPieceStatus(
    @GetUserId() userId: string,
    @Param('pieceSlug') pieceSlug: string,
  ): Promise<Piece> {
    return this.pieceService.getPieceStatus(userId, pieceSlug);
  }

  @Patch('/:pieceId/rate')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  ratePiece(
    @GetUserId() userId: string,
    @Body() ratePieceDto: RatePieceDto,
    @Param('pieceId', ParseUUIDPipe) pieceId: string,
  ): Promise<boolean> {
    return this.pieceService.ratePiece(ratePieceDto, pieceId, userId);
  }

  @Post('/:pieceId/save-progress')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  saveProgress(
    @GetUserId() userId: string,
    @Body() saveProgressDto: SaveProgressDto,
    @Param('pieceId', ParseUUIDPipe) pieceId: string,
  ): Promise<boolean> {
    return this.pieceService.saveProgressOnPiece(
      saveProgressDto,
      pieceId,
      userId,
    );
  }
}
