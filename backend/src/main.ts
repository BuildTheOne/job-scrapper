import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import prismaClient from './config/prisma';
import { config } from 'dotenv';

(async () => {
  config({
    path: '.env',
  });

  const app = await NestFactory.create(AppModule);

  await app.listen(3000, async () => {
    try {
      await prismaClient.$connect();
    } catch (err) {
      await prismaClient.$disconnect();
      throw new Error(err);
    }
  });
})();
