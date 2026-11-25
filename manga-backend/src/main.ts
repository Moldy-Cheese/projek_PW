import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Izinkan frontend React (Vite) memanggil API ini
  app.enableCors({ origin: ['http://localhost:5173'] });

  // Validasi otomatis body request berdasarkan DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API berjalan di http://localhost:${port}`);
}
bootstrap();
