import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ErrorNotifierService } from './common/services/error-notifier.service';
import { AuthModule } from './auth/auth.module';
import { CenterModule } from './center/center.module';

@Module({
  imports: [UserModule, AuthModule, CenterModule],
  controllers: [],
  providers: [ErrorNotifierService],
})
export class AppModule { }
