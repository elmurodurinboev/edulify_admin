import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorNotifierService } from '../services/error-notifier.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly notifier: ErrorNotifierService) { }

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        const error = exception instanceof HttpException ? exception.getResponse() : exception;

        // Faqat 500 xatolarni Telegramga yuboramiz
        if (status === 500) {
            await this.notifier.notify(exception, `${req.method} ${req.url}`);
        }

        res.status(status).json(
            error
        );
    }
}
