function BarisManga({ nomor, manga, terpilih, onPilih }) {
  return (
    <tr className={terpilih ? "terpilih" : ""} onClick={() => onPilih(manga.id)}>
      <td>{nomor}</td>
      <td>
        {manga.image ? (
          <img src={manga.image} alt={manga.judul} className="cover" />
        ) : (
          <div className="cover kosong">Tanpa gambar</div>
        )}
      </td>
      <td>{manga.judul}</td>
      <td>{manga.genre}</td>
      <td>{manga.description}</td>
    </tr>
  );
}

export default BarisManga;