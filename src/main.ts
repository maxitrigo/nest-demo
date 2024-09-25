import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { auth } from 'express-openid-connect';
import { auth0Config } from './Config/auth0.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.use(LoggerGlobal)
  console.log(process.env.SERVER_PORT)
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();