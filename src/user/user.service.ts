import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthProvider } from '../common/enums';
import { CollectionService } from '../collection/collection.service';
import { Collection } from '../collection/collection.entity';
import { getPiecesIdsFromCollection } from '../utils/collections.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private collectionService: CollectionService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: [
        'userToPieces',
        'userToPieces.piece',
        'userToPieces.piece.collections',
      ],
    });
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
