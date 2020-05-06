import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { Collection } from '../collection/collection.entity';
import { PieceType } from '../common/enums';
import { UserToPiece } from '../common/mtm-entities/user-to-piece.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Piece extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PieceType,
    default: PieceType.BOOK,
  })
  type: string;

  @Column({ nullable: false })
  minutes: number;

  @Column({ nullable: true })
  year: number;

  @Expose()
  get rating(): number {
    let rating = 0;
    let rates = 0;
    this.userToPieces?.forEach(relation => {
      rating += relation.rating || 0;
      rates++;
    });
    return (rating / rates) || 0;
  }

  @ManyToMany(
    type => Collection,
    collection => collection.pieces,
  )
  @JoinTable()
  collections: Collection[];

  @OneToMany(
    type => UserToPiece,
    userToPiece => userToPiece.piece,
  )
  userToPieces: UserToPiece[];
}
