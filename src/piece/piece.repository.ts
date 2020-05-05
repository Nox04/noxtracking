import { EntityRepository, getManager, Repository } from 'typeorm';
import { Piece } from './piece.entity';
import { SaveProgressDto } from './dto/save-progress.dto';
import { UserToPiece } from '../common/mtm-entities/user-to-piece.entity';
import { RatePieceDto } from './dto/rate-piece.dto';

@EntityRepository(Piece)
export class PieceRepository extends Repository<Piece> {
  async addOrEditPieceProgress(
    saveProgressDto: SaveProgressDto,
    pieceId: string,
    userId: string,
  ): Promise<boolean> {

    const oldEntity = await getManager().findOne(UserToPiece, {
      where: {
        userId: userId,
        pieceId: pieceId
      }
    }) || new UserToPiece();


    oldEntity.pieceId = pieceId;
    oldEntity.rating = saveProgressDto.rating;
    oldEntity.comment = saveProgressDto.comment;
    oldEntity.finishedTime = saveProgressDto.finishedTime;
    oldEntity.status = saveProgressDto.status;
    oldEntity.userId = userId;

    await getManager().save(oldEntity);
    return true;
  }

  async ratePiece(
    ratePieceDto: RatePieceDto,
    pieceId: string,
    userId: string,
  ): Promise<boolean> {

    const oldEntity = await getManager().findOne(UserToPiece, {
      where: {
        userId: userId,
        pieceId: pieceId
      }
    }) || new UserToPiece();


    oldEntity.pieceId = pieceId;
    oldEntity.rating = ratePieceDto.rating;
    oldEntity.userId = userId;

    await getManager().save(oldEntity);
    return true;
  }
}
