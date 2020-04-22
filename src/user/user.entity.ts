import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { AuthProvider } from '../common/enums';

@Entity()
export class User extends BaseEntity {

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false })
  thirdPartyId: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.GOOGLE,
  })
  authProvider: string;

}
