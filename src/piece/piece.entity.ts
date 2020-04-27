import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { Collection } from '../collection/collection.entity';
import { PieceType } from '../common/enums';

@Entity()
export class Piece extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ nullable: false })
  slug: string;

  @Column({
    type: 'enum',
    enum: PieceType,
    default: PieceType.BOOK,
  })
  type: string;

  @Column({ nullable: false })
  minutes: number;

  @ManyToMany(type => Collection)
  @JoinTable()
  collections: Collection[];
}
