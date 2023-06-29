// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');

  // const httpAdapter = app.get(HttpAdapterHost);

  // const logger = new Logger();
  // // app.useGlobalFilters(new HttpExceptionFilter(logger));
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = 3000;
  await app.listen(port);
}
bootstrap();
