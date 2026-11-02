import BarisManga from "./BarisManga";

function TabelManga({ daftar, idTerpilih, onPilih, totalData }) {
  return (
    <div className="tabel-wrap">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Judul</th>
            <th>Genre</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((manga, index) => (
            <BarisManga
              key={manga.id}
              nomor={index + 1}
              manga={manga}
              terpilih={manga.id === idTerpilih}
              onPilih={onPilih}
            />
          ))}
        </tbody>
      </table>

      {daftar.length === 0 && (
        <p className="kosong-teks">
          {totalData === 0 ? "Belum ada data manga" : "Manga dengan judul tersebut tidak ditemukan"}
        </p>
      )}
    </div>
  );
}

export default TabelManga;