import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}

  @Post('register')
  async register(@Body() input: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.auth.register(input);
    this.setSession(response, result.token);
    return { user: result.user };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() input: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.auth.login(input);
    this.setSession(response, result.token);
    return { user: result.user };
  }

  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('nextserve_session', { httpOnly: true, sameSite: 'lax', path: '/' });
    return { message: 'Signed out.' };
  }

  @Post('forgot-password')
  forgot(@Body() input: ForgotPasswordDto) { return this.auth.forgotPassword(input); }

  @Post('reset-password')
  reset(@Body() input: ResetPasswordDto) { return this.auth.resetPassword(input); }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: Request & { user: unknown }) { return { user: request.user }; }

  private setSession(response: Response, token: string) {
    response.cookie('nextserve_session', token, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
