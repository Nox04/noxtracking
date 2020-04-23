import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

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
    res.redirect(this.authService.getRedirectionUrl(req.user.jwt));
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req) {
    return this.authService.getUserFromToken(req.user.id);
  }
}
