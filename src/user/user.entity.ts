import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { AuthProvider } from '../common/enums';
import { Exclude } from 'class-transformer';

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

}
