import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { CommonModule } from 'src/common/common.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/role.guard';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
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
  imports: [
    CommonModule
  ],
  exports: [
    UserService
  ]
})
export class UserModule { }
