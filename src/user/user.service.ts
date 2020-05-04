import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthProvider } from '../common/enums';
import { CollectionService } from '../collection/collection.service';
import { Collection } from '../collection/collection.entity';
import { getPiecesIdsFromCollection } from '../utils/collections.util';
import { SaveProgressDto } from './dto/save-progress.dto';
import { PieceService } from '../piece/piece.service';
import { Piece } from '../piece/piece.entity';
import { UserToPiece } from '../common/mtm-entities/user-to-piece.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private collectionService: CollectionService,
    private pieceService: PieceService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getCollectionStatus(
    userId: string,
    collectionSlug: string,
  ): Promise<User> {
    const collection: Collection = await this.collectionService.findBySlug(
      collectionSlug,
    );
    const groupIds = getPiecesIdsFromCollection(collection);

    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect(
        'user.userToPieces',
        'pieces',
        'pieces.pieceId IN (:...groupIds)',
        { groupIds },
      )
      .getOne();
  }

  async saveProgressOnPiece(
    saveProgressDto: SaveProgressDto,
    userId: string,
  ): Promise<boolean> {
    const user: User = await this.findOne(userId);
    return this.userRepository.addOrEditPieceProgress(saveProgressDto, user);
  }

  findOneByThirdPartyId(
    thirdPartyId: string,
    authProvider: AuthProvider,
  ): Promise<User> {
    return this.userRepository.findOne({
      thirdPartyId,
      authProvider,
    });
  }

  registerOAuthUser(raw: any, authProvider: AuthProvider): Promise<User> {
    return this.userRepository.save({
      thirdPartyId: raw.sub,
      email: raw.email,
      picture: raw.picture,
      name: raw.name,
      authProvider,
    });
  }
}
