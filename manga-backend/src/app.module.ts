import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MangaModule } from './manga/manga.module';

@Module({
  imports: [PrismaModule, MangaModule],
})
export class AppModule {}
