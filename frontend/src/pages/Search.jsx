import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiAuthFetch } from "../services/apiAuthFetch";

export default function Search() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);//lista de playlist din backend
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");//playlist ales

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function loadPlaylists() {//functia incarca playlisturi din backend
    setErr(""); 
    setOk(""); 
    setLoading(true);

    try {
      const data = await apiAuthFetch("/playlists", {//ia playlisturile cu GET /api/playlists
         token, //rimite token
          logout,//logout daca tokenul este invalid
           navigate //redirect
          
      });

      setPlaylists(data);//salvezi lista in state

      if (data.length > 0) setSelectedPlaylistId(String(data[0].id));//selectezi automat primul playlist
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);//opresti loadingul indiferent de rezultat
    }
  }

  useEffect(() => { loadPlaylists(); }, []); //ruleaza cand pagina se incarca

  async function handleAdd(e) {//adaugarea video-ului
    e.preventDefault();//previne refreshul paginii la submit
    setErr(""); //curata mesaje vechi
    setOk("");//curata meaje vechi
    //validari , opreste executia daca datele sunt invalide
    if (!selectedPlaylistId) return setErr("Selectează un playlist.");
    if (!title.trim()) return setErr("Title este obligatoriu.");
    if (!url.trim()) return setErr("URL este obligatoriu.");

    try {
      await apiAuthFetch(`/videos/${selectedPlaylistId}`, {//POST catre backend
        token, logout, navigate,
        method: "POST", 
        body: { title, url },//trimite titlu +url
      });

      setOk("Videoclip adăugat în playlist ✨");
      setTitle("");
      setUrl("");
    } catch (e) {
      setErr(e.message);
    }
  }

  if (loading) return <p>Loading...</p>;//cat timp se incarc playlisturile afisam loading....

  return (
    <div className="stack">
      <div className="card">
        <h2>Add video to playlist</h2>
        

        <form className="form" onSubmit={handleAdd}>
          <div>
            <label>Playlist</label>
            <select value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)}>
              {playlists.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name ?? `Playlist #${p.id}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ex: 2025 treanding" />
          </div>

          <div>
            <label>URL</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/wv=..." />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">Add</button>
            <button className="btn" type="button" onClick={loadPlaylists}>Reload playlists</button>
          </div>

          {err && <p>{err}</p>}
          {ok && <p>{ok}</p>}
        </form>
      </div>
    </div>
  );
}
