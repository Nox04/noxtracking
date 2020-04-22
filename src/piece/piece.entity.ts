import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';

@Entity()
export class Piece extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ nullable: false })
  minutes: number;

}
