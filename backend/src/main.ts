import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './AppModule';
import prismaClient from './config/prisma';

(async () => {
  config({
    path: '.env',
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.listen(3000, async () => {
    try {
      await prismaClient.$connect();
    } catch (err) {
      await prismaClient.$disconnect();
      throw new Error(err);
    }
  });
})();
