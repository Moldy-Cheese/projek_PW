import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TabelManga from "../components/TabelManga";

function HomePage({ daftarManga, onHapus }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [idTerpilih, setIdTerpilih] = useState(null);

  const hasil = daftarManga.filter((m) =>
    m.judul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  const handleUpdate = () => {
    if (idTerpilih === null) {
      alert("Pilih manga di tabel terlebih dahulu");
      return;
    }
    navigate(`/update/${idTerpilih}`);
  };

  const handleDelete = () => {
    const manga = daftarManga.find((m) => m.id === idTerpilih);
    if (!manga) {
      alert("Pilih manga di tabel terlebih dahulu");
      return;
    }
    if (window.confirm(`Yakin ingin menghapus "${manga.judul}"?`)) {
      onHapus(manga.id);
      setIdTerpilih(null);
    }
  };

  return (
    <div className="halaman">
      <div className="atas">
        <Header judul="Manga Sheva" subjudul="Koleksi Daftar Manga" />
        <div className="kontrol">
          <SearchBar nilai={input} onUbah={setInput} onCari={() => setKataKunci(input)} />
          <div className="aksi">
            <button onClick={() => navigate("/tambah")}>Tambah</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>

      <TabelManga
        daftar={hasil}
        idTerpilih={idTerpilih}
        onPilih={setIdTerpilih}
        totalData={daftarManga.length}
      />
    </div>
  );
}

export default HomePage;