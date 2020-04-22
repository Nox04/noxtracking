import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { AuthProvider } from '../common/enums';
import * as config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'HELLO_HELLO'; // <- replace this with your secret key

  constructor(private readonly userService: UserService) {}

  async validateOAuthLogin(
    rawJson: any,
    provider: AuthProvider,
  ): Promise<string> {
    try {
      let user = await this.userService.findOneByThirdPartyId(
        rawJson.sub,
        provider,
      );

      if (!user)
        user = await this.userService.registerOAuthUser(rawJson, provider);

      return sign({ id: user.id }, this.JWT_SECRET_KEY, {
        expiresIn: jwtConfig.expiresIn,
      });
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async getUserFromToken(userId: string) {
    try {
      return await this.userService.findOne(userId);
    } catch (err) {
      throw new InternalServerErrorException('getUserFromToken', err.message);
    }
  }
}
