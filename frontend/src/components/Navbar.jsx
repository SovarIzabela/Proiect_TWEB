import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
        Playlist Manager
      </span>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/playlists" style={{ marginRight: "1rem" }}>Playlists</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
}
