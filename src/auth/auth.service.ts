import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { AuthProvider } from '../common/enums';
import * as config from 'config';
import { User } from '../user/user.entity';

const jwtConfig = config.get('jwt');
const serverConfig = config.get('server');

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = jwtConfig.secret;

  constructor(private readonly userService: UserService) {}

  async validateOAuthLogin(
    rawJson: any,
    provider: AuthProvider,
  ): Promise<string> {
    try {
      let user: User = await this.userService.findOneByThirdPartyId(
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

  getRedirectionUrl(token: string): string {
    return token
      ? `${serverConfig.frontURL}/login/success?token=${token}`
      : `${serverConfig.frontURL}/login/failure`;
  }
}
