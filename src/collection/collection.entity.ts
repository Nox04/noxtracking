import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { Piece } from '../piece/piece.entity';
import { Expose } from 'class-transformer';
import { PieceType } from '../common/enums';

@Entity()
export class Collection extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ nullable: false })
  slug: string;

  @ManyToMany(
    type => Piece,
    piece => piece.collections,
  )
  pieces: Piece[];

  @ManyToMany(
    type => Collection,
    collection => collection.collections,
  )
  @JoinTable()
  collections: Collection[];

  @Expose()
  get minutes(): number {
    let minutes = 0;
    this.pieces.forEach(piece => (minutes += piece.minutes));
    this.collections?.forEach(collection => (minutes += collection.minutes));
    return minutes;
  }

  @Expose()
  get booksCount(): number {
    let booksCount = 0;
    this.pieces.forEach(piece => {
      if (piece.type === PieceType.BOOK) booksCount++;
    });
    this.collections?.forEach(collection => {
      booksCount += collection.booksCount;
    });
    return booksCount;
  }

  @Expose()
  get moviesCount(): number {
    let moviesCount = 0;
    this.pieces.forEach(piece => {
      if (piece.type === PieceType.MOVIE) moviesCount++;
    });
    this.collections?.forEach(collection => {
      moviesCount += collection.moviesCount;
    });
    return moviesCount;
  }
}
