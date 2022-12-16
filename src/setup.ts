import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { getServerConfig } from '../ormconfig';
import { HttpExceptionFilter } from './filters/http-exception.filter';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();
  const flag: boolean = config['LOG_ON'] === 'true';
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');

  const logger = new Logger();
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 300,
    }),
  );
};
