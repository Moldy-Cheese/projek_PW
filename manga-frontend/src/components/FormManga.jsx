import { useState } from "react";

function FormManga({ nilaiAwal, labelTombol, onSimpan, onBatal }) {
  const [judul, setJudul] = useState(nilaiAwal?.judul ?? "");
  const [genre, setGenre] = useState(nilaiAwal?.genre ?? "");
  const [image, setImage] = useState(nilaiAwal?.image ?? "");
  const [description, setDescription] = useState(nilaiAwal?.description ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul.trim()) {
      alert("Judul tidak boleh kosong");
      return;
    }
    onSimpan({ judul: judul.trim(), genre, image, description });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Judul
        <input value={judul} onChange={(e) => setJudul(e.target.value)} />
      </label>
      <label>
        Genre
        <input value={genre} onChange={(e) => setGenre(e.target.value)} />
      </label>
      <label>
        URL gambar
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </label>
      <label>
        Description
        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <div className="aksi">
        <button type="submit">{labelTombol}</button>
        <button type="button" onClick={onBatal}>Batal</button>
      </div>
    </form>
  );
}

export default FormManga;