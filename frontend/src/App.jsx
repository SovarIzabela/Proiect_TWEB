import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Playlists from "./pages/Playlists.jsx";
import PlaylistDetails from "./pages/PlaylistDetails.jsx";
import Search from "./pages/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
