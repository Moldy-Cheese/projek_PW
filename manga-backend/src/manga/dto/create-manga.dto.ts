import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMangaDto {
  @IsString()
  @IsNotEmpty({ message: 'judul tidak boleh kosong' })
  judul: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
