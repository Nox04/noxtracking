import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { AuthProvider } from '../common/enums';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID:
        '57356067908-pcdekg5p0tva5ij1l3ki8okoujlmmcsc.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: '3Ko-x1qRATbu3sCNUbXlajld', // <- Replace this with your client secret
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    try {

      const jwt: string = await this.authService.validateOAuthLogin(profile._json, AuthProvider.GOOGLE);
      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
