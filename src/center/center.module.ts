import { Module } from '@nestjs/common';
import { CenterController } from './center.controller';
import { CenterService } from './center.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CenterController],
  providers: [
    CenterService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [CommonModule]
})
export class CenterModule { }
