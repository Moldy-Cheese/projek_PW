import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get() // GET /manga?judul=one&genre=petualangan
  findAll(@Query('judul') judul?: string, @Query('genre') genre?: string) {
    return this.mangaService.findAll({ judul, genre });
  }

  @Get('stats') // GET /manga/stats  (harus di atas ':id')
  stats() {
    return this.mangaService.stats();
  }

  @Get(':id') // GET /manga/1
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mangaService.findOne(id);
  }

  @Post() // POST /manga
  create(@Body() dto: CreateMangaDto) {
    return this.mangaService.create(dto);
  }

  @Patch(':id') // PATCH /manga/1
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMangaDto) {
    return this.mangaService.update(id, dto);
  }

  @Delete(':id') // DELETE /manga/1
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mangaService.remove(id);
  }
}
