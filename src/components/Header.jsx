function Header({ judul, subjudul}) {
  return (
    <div className="header">
      <h1>{judul}</h1>
      <p>{subjudul}</p>
    </div>
  );
}

export default Header;