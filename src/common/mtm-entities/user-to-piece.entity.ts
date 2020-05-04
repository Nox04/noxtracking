import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';
import { Piece } from '../../piece/piece.entity';
import { BaseEntity } from '../base-entity';
import { ProgressStatus } from '../enums';

@Entity()
export class UserToPiece extends BaseEntity {
  @Column()
  userId!: string;

  @Column()
  pieceId!: string;

  @Column({ nullable: true })
  rating?: number;

  @Column({ nullable: true })
  comment?: string;

  @Column({ nullable: true })
  finishedTime?: Date;

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.PENDING,
  })
  status: string;

  @ManyToOne(
    type => User,
    user => user.userToPieces,
  )
  user: User;

  @ManyToOne(
    type => Piece,
    piece => piece.userToPieces,
  )
  piece: Piece;
}
