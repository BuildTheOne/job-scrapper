import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import prismaClient from './config/prisma';
import { AppModule } from './modules/AppModule';

(async () => {
  config({
    path: '.env',
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.listen(9000, async () => {
    try {
      await prismaClient.$connect();
    } catch (err) {
      await prismaClient.$disconnect();
      throw new Error(err);
    }
  });
})();
