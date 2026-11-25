import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import FormManga from "../components/FormManga";

function UpdatePage({ daftarManga, onUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const manga = daftarManga.find((m) => m.id === Number(id));

  if (!manga) {
    return (
      <div className="halaman">
        <Header judul="Update Manga" subjudul="Data tidak ditemukan" />
        <button className="tombol-solo" onClick={() => navigate("/")}>Kembali</button>
      </div>
    );
  }

  return (
    <div className="halaman halaman-form">
      <Header judul="Update Manga" subjudul={`Mengubah: ${manga.judul}`} />
      <FormManga
        nilaiAwal={manga}
        labelTombol="Simpan perubahan"
        onSimpan={(data) => {
          onUpdate(manga.id, data);
          navigate("/");
        }}
        onBatal={() => navigate("/")}
      />
    </div>
  );
}

export default UpdatePage;