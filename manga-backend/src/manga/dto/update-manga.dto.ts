import { PartialType } from '@nestjs/mapped-types';
import { CreateMangaDto } from './create-manga.dto';

// Semua field menjadi opsional saat update (PATCH)
export class UpdateMangaDto extends PartialType(CreateMangaDto) {}
