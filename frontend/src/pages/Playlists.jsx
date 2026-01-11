import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuthFetch } from "../services/apiAuthFetch";
import { useAuth } from "../context/AuthContext";
import "../styles/playlists.css";

export default function Playlists() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // form create
  const [name, setName] = useState("");
  const [descriere, setDescriere] = useState("");

  // UX
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function fetchPlaylists() {
    try {
      setIsLoading(true);
      setError("");
      setOk("");

      const data = await apiAuthFetch("/playlists", {
        token,
        logout,
        navigate,
      });

      setPlaylists(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // nu pune navigate/logout ca dependențe (îți reface request-ul prea des)

  async function handleCreatePlaylist(e) {
    e.preventDefault();
    setError("");
    setOk("");

    if (!name.trim()) return setError("Name este obligatoriu.");
    if (!descriere.trim()) return setError("Descrierea este obligatorie.");

    try {
      setIsLoading(true);

      const created = await apiAuthFetch("/playlists", {
        token,
        logout,
        navigate,
        method: "POST",
        body: { name, descriere },
      });

      // adaugi playlistul creat în listă imediat
      setPlaylists((prev) => [created, ...prev]);

      setName("");
      setDescriere("");
      setOk("Playlist creat ");
    } catch (err) {
      setError(err.message || "Create failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="row">
          <h2>Playlists</h2>
          <span className="badge">Total: {playlists.length}</span>
        </div>

        <form className="form" onSubmit={handleCreatePlaylist}>
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: 2025 trending"
              disabled={isLoading}
            />
          </div>

          <div>
            <label>Descriere</label>
            <input
              value={descriere}
              onChange={(e) => setDescriere(e.target.value)}
              placeholder="ex: Videoclipuri preferate"
              disabled={isLoading}
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Create playlist
            </button>

            <button className="btn" type="button" onClick={fetchPlaylists} disabled={isLoading}>
              Reload
            </button>

            <button className="btn" type="button" onClick={() => navigate("/search")} disabled={isLoading}>
              Add video (Search)
            </button>
          </div>

          {isLoading && <p>Loading...</p>}
          {error && <p>⛔ {error}</p>}
          {ok && <p>{ok}</p>}
        </form>
      </div>

      {isLoading && playlists.length === 0 ? (
        <p>Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <div className="playlist-empty ">
          <p>No playlists found. Create one above ✨</p>
        </div>
      ) : (
        <div className="stack">
          {playlists.map((p) => (
            <div className="card playlist-card" key={p.id}>
              <div className="row">
                <h3>{p.name}</h3>
                <span className="badge">Videos: {p.videoCount ?? 0}</span>
              </div>

              <p className="helper">{p.descriere}</p>

              <div className="actions">
                <Link className="btn" to={`/playlists/${p.id}`}>
                  Open
                </Link>
                <button className="btn" type="button" onClick={() => navigate("/search")}>
                  Add video
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
