import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthProvider } from '../common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
  ) {}

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByThirdPartyId(
    thirdPartyId: string,
    authProvider: AuthProvider,
  ): Promise<User> {
    return this.usersRepository.findOne({
      thirdPartyId,
      authProvider,
    });
  }

  registerOAuthUser(raw: any, authProvider: AuthProvider): Promise<User> {
    return this.usersRepository.save({
      thirdPartyId: raw.sub,
      email: raw.email,
      picture: raw.picture,
      name: raw.name,
      authProvider,
    });
  }
}
