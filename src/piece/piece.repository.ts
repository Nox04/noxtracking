import { EntityRepository, Repository } from 'typeorm';
import { Piece } from './piece.entity';

@EntityRepository(Piece)
export class PieceRepository extends Repository<Piece> {}
