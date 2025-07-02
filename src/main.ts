import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorNotifierService } from './common/services/error-notifier.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  const notifier = app.get(ErrorNotifierService);
  app.useGlobalFilters(new AllExceptionsFilter(notifier));
   app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', "Accept-Language"],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints ?? {})
      }));

      return new BadRequestException({
        success: false,
        statusCode: 422,
        errors: formattedErrors,
      });
    },
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
