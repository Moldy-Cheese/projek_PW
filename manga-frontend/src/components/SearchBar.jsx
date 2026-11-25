function SearchBar({ nilai, onUbah, onCari }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCari();
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder="Cari..."
      />
      <button type="submit" aria-label="Cari">🔍︎</button>
    </form>
  );
}

export default SearchBar;