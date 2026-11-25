import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Data awal yang sama dengan `dataAwal` di App.jsx frontend
async function main() {
  const total = await prisma.manga.count();
  if (total > 0) {
    console.log(`Seed dilewati, tabel sudah berisi ${total} data.`);
    return;
  }
  await prisma.manga.createMany({
    data: [
      { judul: 'One Piece', genre: 'Petualangan', description: 'Perjalanan Luffy mencari harta karun One Piece.' },
      { judul: 'Vagabond', genre: 'Sejarah', description: 'Kisah fiksi tentang Miyamoto Musashi.' },
      { judul: 'Monster', genre: 'Thriller', description: 'Dokter Tenma memburu pembunuh yang pernah ia selamatkan.' },
    ],
  });
  console.log('Seed selesai: 3 manga ditambahkan.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
