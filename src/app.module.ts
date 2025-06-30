import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ErrorNotifierService } from './common/services/error-notifier.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [ErrorNotifierService],
})
export class AppModule { }
