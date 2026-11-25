import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Injectable()
export class MangaService {
  constructor(private readonly prisma: PrismaService) {}

  // READ (semua) + filter opsional ?judul=...&genre=...  -> klausa `where`
  findAll(filter: { judul?: string; genre?: string } = {}) {
    const where: Prisma.MangaWhereInput = {};
    if (filter.judul) {
      where.judul = { contains: filter.judul, mode: 'insensitive' };
    }
    if (filter.genre) {
      where.genre = { equals: filter.genre, mode: 'insensitive' };
    }
    return this.prisma.manga.findMany({ where, orderBy: { id: 'asc' } });
  }

  // READ (satu)
  async findOne(id: number) {
    const manga = await this.prisma.manga.findUnique({ where: { id } });
    if (!manga) throw new NotFoundException(`Manga dengan id ${id} tidak ditemukan`);
    return manga;
  }

  // CREATE
  create(dto: CreateMangaDto) {
    return this.prisma.manga.create({ data: dto });
  }

  // UPDATE
  async update(id: number, dto: UpdateMangaDto) {
    await this.findOne(id); // 404 jika tidak ada
    return this.prisma.manga.update({ where: { id }, data: dto });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id); // 404 jika tidak ada
    return this.prisma.manga.delete({ where: { id } });
  }

  // Statistik sederhana (nilai tambah): count total + count per genre
  async stats() {
    const total = await this.prisma.manga.count();
    const grup = await this.prisma.manga.groupBy({
      by: ['genre'],
      _count: { _all: true },
      orderBy: { genre: 'asc' },
    });
    return {
      total,
      perGenre: grup.map((g) => ({ genre: g.genre || '(tanpa genre)', jumlah: g._count._all })),
    };
  }
}
