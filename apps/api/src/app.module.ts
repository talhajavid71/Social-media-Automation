import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { BrandKitsModule } from './brand-kits/brand-kits.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env', '.env'] }), PrismaModule, AuthModule, ClientsModule, BrandKitsModule, ContentModule],
  controllers: [HealthController],
})
export class AppModule {}
