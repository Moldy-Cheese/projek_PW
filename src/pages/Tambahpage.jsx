import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FormManga from "../components/Formmanga";

function TambahPage({ onTambah }) {
  const navigate = useNavigate();

  return (
    <div className="halaman halaman-form">
      <Header judul="Tambah Manga" subjudul="Isi data manga baru" />
      <FormManga
        labelTombol="Tambah"
        onSimpan={(data) => {
          onTambah(data);
          navigate("/");
        }}
        onBatal={() => navigate("/")}
      />
    </div>
  );
}

export default TambahPage;