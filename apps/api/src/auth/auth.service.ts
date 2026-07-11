import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(input: RegisterDto) {
    const email = input.email.trim().toLowerCase();
    if (await this.prisma.user.findUnique({ where: { email } })) throw new BadRequestException('An account with this email already exists.');
    const user = await this.prisma.user.create({
      data: { name: input.name.trim(), email, passwordHash: await hash(input.password, 12) },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return { user, token: await this.sign(user.id, user.email) };
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email.trim().toLowerCase() } });
    if (!user || !(await compare(input.password, user.passwordHash))) throw new UnauthorizedException('Invalid email or password.');
    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
      token: await this.sign(user.id, user.email),
    };
  }

  async forgotPassword(input: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email.trim().toLowerCase() } });
    let resetToken: string | undefined;
    if (user) {
      resetToken = randomBytes(32).toString('hex');
      await this.prisma.user.update({
        where: { id: user.id },
        data: { resetTokenHash: this.tokenHash(resetToken), resetTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000) },
      });
    }
    return { message: 'If an account exists, a reset link has been prepared.', ...(process.env.NODE_ENV !== 'production' && resetToken ? { resetToken } : {}) };
  }

  async resetPassword(input: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { resetTokenHash: this.tokenHash(input.token), resetTokenExpiresAt: { gt: new Date() } },
    });
    if (!user) throw new BadRequestException('This reset link is invalid or expired.');
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hash(input.password, 12), resetTokenHash: null, resetTokenExpiresAt: null },
    });
    return { message: 'Password updated successfully.' };
  }

  private sign(id: string, email: string) { return this.jwt.signAsync({ sub: id, email }); }
  private tokenHash(token: string) { return createHash('sha256').update(token).digest('hex'); }
}
