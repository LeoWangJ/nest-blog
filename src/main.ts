import { NestFactory } from '@nestjs/core';
import { getServerConfig } from '../ormconfig';
import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap() {
  const config = getServerConfig();
  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: true,
  });
  setupApp(app);
  const port =
    typeof config['APP_PORT'] === 'string'
      ? parseInt(config['APP_PORT'])
      : 3000;
  await app.listen(port);
  await app.init();
}
bootstrap();
