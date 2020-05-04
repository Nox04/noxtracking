import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SaveProgressDto } from './dto/save-progress.dto';
import { UserToPiece } from '../common/mtm-entities/user-to-piece.entity';
import { getManager } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async addOrEditPieceProgress(
    saveProgressDto: SaveProgressDto,
    user: User,
  ): Promise<boolean> {

    const oldEntity = await getManager().findOne(UserToPiece, {
      where: {
        userId: user.id,
        pieceId: saveProgressDto.pieceId
      }
    }) || new UserToPiece();


    oldEntity.pieceId = saveProgressDto.pieceId;
    oldEntity.rating = saveProgressDto.rating;
    oldEntity.comment = saveProgressDto.comment;
    oldEntity.finishedTime = saveProgressDto.finishedTime;
    oldEntity.status = saveProgressDto.status;
    oldEntity.userId = user.id;

    await getManager().save(oldEntity);
    return true;
  }
}
