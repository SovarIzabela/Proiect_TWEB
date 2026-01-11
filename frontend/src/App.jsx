import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Playlists from "./pages/Playlists.jsx";
import PlaylistDetails from "./pages/PlaylistDetails.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register"
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlaylistDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
