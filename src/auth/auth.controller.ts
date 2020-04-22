import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import * as config from 'config';
const serverConfig = config.get('server');

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect(`${serverConfig.frontURL}/login/success?token=${jwt}`);
    else res.redirect(`${serverConfig.frontURL}/login/failure`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req)
  {
    return this.authService.getUserFromToken(req.user.id);
  }
}
