import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { getServerConfig } from 'ormconfig';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();
  const flag: boolean = config['LOG_ON'] === 'true';
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('app/v1');

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
