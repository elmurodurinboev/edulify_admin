// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { ErrorNotifierService } from './services/error-notifier.service';

@Module({
    providers: [ErrorNotifierService],
    exports: [ErrorNotifierService],
})
export class CommonModule { }
