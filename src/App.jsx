import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import TambahPage from "./pages/Tambahpage";
import UpdatePage from "./pages/Updatepage";

const dataAwal = [
  { id: 1, image: "https://temp.compsci88.com/cover/normal/01J76XYE3130E1W5HKTJ7VD912.webp", judul: "Sakamoto Days", genre: "Action, Comedy, Shounen, Supernatural", description: "Taro Sakamoto was the ultimate assassin, feared by villains and admired by hitmen. But one day...he fell in love! Retirement, marriage, fatherhood and then... Sakamoto gained weight! The chubby guy who runs the neighborhood store is actually a former legendary hitman! Can he protect his family from danger? Get ready to experience a new kind of action comedy series!" },
  { id: 2, image: "https://temp.compsci88.com/cover/normal/01J76XYDXH7KT6AABVG3JAT3ZP.webp", judul: "Shangri-La Frontier", genre: "Action, Adventure, Comedy, Drama, Fantasy, Sci-fi, Shounen", description: 'Second-year high school student Rakurou Hizutome is interested in one thing only: finding "shitty games" and beating the crap out of them. His gaming skills are second to none, and no game is too bad for him to enjoy. So when he is introduced to the new VR game Shangri-La Frontier, he does what he does best min-maxes and skips the prologue to jump straight into the action. But can even an expert gamer like Rakurou discover all the secrets that Shangri-La Frontier hides?' },
  { id: 3, image: "https://temp.compsci88.com/cover/normal/01J76XYFH6Y4GN3P2G4WF82BEZ.webp", judul: "Ruri Dragon", genre: "Comedy, Fantasy, School Life, Shounen, Slice of Life", description: "Ruri faces the usual issues: pushy classmates, annoying teachers and...waking up with dragon horns?!" },
  { id: 4, image: "https://temp.compsci88.com/cover/normal/01M1P8E4QQMCF9ARYG81RBZZ9M.webp", judul: "Idolatry", genre: "Drama, School Life, Shounen", description: 'High school girl Junna Harumi purpose in life is to support the idol Fuwari Tsukishiro! One day, the idol group Fuwari belongs to disbands. In her despair, Junna learns that Fuwari will be trying out for an idol audition program. There will be a total of 100 participants - in order to lead her idol to the top, Junna decides to take part in the audition herself and work behind the scenes. This idol-otaku girl lifelong "supporting activity" begins now!'},
];

function App() {
  const [daftarManga, setDaftarManga] = useState(dataAwal);

  const tambahManga = (mangaBaru) => {
    setDaftarManga([...daftarManga, { id: Date.now(), ...mangaBaru }]);
  };

  const updateManga = (id, dataBaru) => {
    setDaftarManga(daftarManga.map((m) => (m.id === id ? { ...m, ...dataBaru } : m)));
  };

  const hapusManga = (id) => {
    setDaftarManga(daftarManga.filter((m) => m.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage daftarManga={daftarManga} onHapus={hapusManga} />} />
      <Route path="/tambah" element={<TambahPage onTambah={tambahManga} />} />
      <Route path="/update/:id" element={<UpdatePage daftarManga={daftarManga} onUpdate={updateManga} />} />
    </Routes>
  );
}

export default App;