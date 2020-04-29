import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { AuthProvider } from '../common/enums';
import { Exclude } from 'class-transformer';
import { UserToPiece } from '../common/mtm-entities/user-to-piece.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  picture: string;

  @Exclude()
  @Column({ nullable: false })
  thirdPartyId: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.GOOGLE,
  })
  authProvider: string;

  @OneToMany(
    type => UserToPiece,
    userToPiece => userToPiece.user,
  )
  userToPieces: UserToPiece[];

}
