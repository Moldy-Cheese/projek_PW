import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import TambahPage from "./pages/Tambahpage";
import UpdatePage from "./pages/UpdatePage";
import { getAllManga, createManga, updateMangaApi, deleteMangaApi } from "./api/mangaApi";

function App() {
  const [daftarManga, setDaftarManga] = useState([]);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    getAllManga()
      .then(setDaftarManga)
      .catch((e) => alert(`Gagal memuat data: ${e.message}`))
      .finally(() => setMemuat(false));
  }, []);

  const tambahManga = async (mangaBaru) => {
    try {
      const dibuat = await createManga(mangaBaru);
      setDaftarManga((lama) => [...lama, dibuat]);
    } catch (e) {
      alert(e.message);
    }
  };

  const updateManga = async (id, dataBaru) => {
    try {
      const hasil = await updateMangaApi(id, dataBaru);
      setDaftarManga((lama) => lama.map((m) => (m.id === id ? hasil : m)));
    } catch (e) {
      alert(e.message);
    }
  };

  const hapusManga = async (id) => {
    try {
      await deleteMangaApi(id);
      setDaftarManga((lama) => lama.filter((m) => m.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  if (memuat) return <p style={{ padding: 24 }}>Memuat data...</p>;

  return (
    <Routes>
      <Route path="/" element={<HomePage daftarManga={daftarManga} onHapus={hapusManga} />} />
      <Route path="/tambah" element={<TambahPage onTambah={tambahManga} />} />
      <Route path="/update/:id" element={<UpdatePage daftarManga={daftarManga} onUpdate={updateManga} />} />
    </Routes>
  );
}

export default App;
