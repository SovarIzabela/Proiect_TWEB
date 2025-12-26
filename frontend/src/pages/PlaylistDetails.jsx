import {  useEffect, useMemo, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../context/useAuth.js";
import{apiAuthFetch} from "../services/apiAuthFetch.js";
import "../styles/playlistDetails.css"


export default function PlaylistDetails() {//pagina pentru detaliile unui playlist.
  const { id} = useParams();//ia id din parametrii url-ului. ex: /playlists/123 -> id=123
  const playlistId = useMemo(() => id, [id]);//memoreaza id-ul playlist-ului pentru a evita recalcularile inutile.
  const { token } = useAuth();//ia token-ul de autentificare din context.
  const navigate = useNavigate();//hook pentru navigare ex: navigate("/home")
  const[videos, setVideos] = useState([]);//starea pentru videoclipurile din playlist.
  //state pentru formularul de add
  const[title, setTitle] = useState("");//starea pentru titlul playlist-ului.
  const[url, setUrl] = useState("");//starea pentru url-ul de partajare al playlist-ului.
  //state pentru edit
  const[editingVideoId, setEditingVideoId] = useState(null);//starea pentru id-ul videoclipului care este editat.Daca este null, nu se editeaza niciun videoclip.
  const[editedTitle, setEditedTitle] = useState("");//starea pentru titlul editat al videoclipului.
  const[editedUrl, setEditedUrl] = useState("");//starea pentru url-ul editat al videoclipului.
  //state petru UX  
  const[isLoading, setIsLoading] = useState(false);//starea pentru incarcare.
  const[error, setError] = useState(null);//starea pentru eroare. 
  const[ok, setOk] = useState(null);//starea pentru mesaj de succes.


  useEffect(()=>{

    const controller = new AbortController();//controller pentru anularea fetch-ului daca componenta se demonteaza.

    async function fetchVideos(){//functie asincrona pentru a prelua videoclipurile din playlist.
      try {
         setIsLoading (true);//pornim loading
         setError (null);//curat mesajele
         setOk (null);
         if(!Number.isFinite(playlistId)){
          throw new Error ("Invalid playlist id");
         }
          const data = await apiAuthFetch('/videos/${playlistId}' , {//apelez backend GET
           token,
           logout,
           navigate,
          });
        
          setVideos (Array.isArray(data) ? data : []);//daca backend returneaza array il pun in state altfel lista goala
             }catch(err){
        setError (err.message);
      } finally {
        setIsLoading (false); 
     }


    }    
    fetchVideos();

    return () => {
      controller.abort();//anuleaza fetch-ul la demontarea componentei.
    };
  }, [playlistId, token, navigate]);//se executa la montarea componentei si la schimbarea playlistId, token sau navigate.

  function startEdit(v){
    setError(null);
    setOk(null);
    setEditingVideoId(v.id);
    setEditedTitle(v.title?? "");
    setEditedUrl (v.url?? "");

  }

  function cancelEdit(){
   
    setEditingVideoId(null);
    setEditedTitle("");
    setEditedUrl(""); }

    async function handleAdd(e){
    e.preventDefault();
    setError(null);
    setOk(null);
    try {
      setIsLoading(true);//pornesti loadingul
      const created =await apiAuthFetch('/videos/${playlistId}', {
        token,
        logout,
        navigate,
        method: "POST",
        body:{ title, url},
      }); // trimiti post catre backend cu datele din formular
      setVideos((prev)=>[...prev, created]);//adaugi video nou la lista
      setTitle("");
      setUrl("");
      setOk("Video added successfully");
    }catch(err){
      setError(err.message);

    }finally{
      setIsLoading(false);}
    }

    async function handleSaveEdit(videoId){//salveaza EDIT
      setError(null);
      setOk(null);
    try{

      setIsLoading (true);
      const data = await apiAuthFetch('/videos/${videoId}', {
        token,
        logout,
        navigate,
        method: "PATCH",
        body:{ title: editedTitle, url: editedUrl},
      });
      const updated = data.video?? data;
      setVideos((prev) => prev.map(v => v.id === videoId ? {...v, ...updated} : v));//inlocuiesc in video doar video editat
      cancelEdit();
      setOk("Video updated successfully");
    }catch(err){
    
    setError(err.message);
    
    }finally{
      setIsLoading(false);
    }

    async function handleDelete(videoId){
      setError(null);
      setOk(null);
      const confirm = window.confirm("Are you sure you want to delete this video?");
      if(!confirm) return;

      try{
        setIsLoading (true);
        await apiAuthFetch('/videos/${videoId}', {
          token,
          logout,
          navigate,
          method: "DELETE",
        });
        setVideos((prev) => prev.filter (v => v.id !== videoId));//scot video din lista cu filter
        if(editingVideoId === videoId){
          cancelEdit();
        }
        setOk("Video deleted successfully");

      }catch(err){
        setError(err.message);

      }finally{
        setIsLoading(false);
      }






    }

     return (
    <div className="stack">
      <div className="card">
        <div className="row">
          <h2>Playlist #{Number.isFinite(playlistId) ? playlistId : "?"}</h2>
          <span className="badge">Videos: {videos.length}</span>
        </div>
        
        <div className="actions">
          <Link className="btn" to="/playlists">
             Back to playlists
          </Link>
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/search")}
          >
            Add from Search
          </button>
        </div>

        <form className="form" onSubmit={handleAdd}>
          <div>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Lofi beats for coding"
              disabled={isLoading}
            />
          </div>

          <div>
            <label>URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Add video
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setTitle("");
                setUrl("");
                setError("");
                setOk("");
              }}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>

          {isLoading && <p>Loading...</p>}
          {error && (
            <p>
              <span>⛔️</span> {error}
            </p>
          )}
          {ok && <p>{ok}</p>}
        </form>
      </div>

      {isLoading && videos.length === 0 ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <div className="card">
          <p>Nu există videoclipuri încă în acest playlist.</p>
        </div>
      ) : (
        <div className="stack">
          {videos.map((v) => {
            const isEditing = editingVideoId === v.id;

            return (
              <div className="card" key={v.id}>
                {!isEditing ? (
                  <div className="card__top">
                    <div className="card__top-left">
                      <div className="row">
                        <h3>{v.title}</h3>
                        <span className="badge">id: {v.id}</span>
                      </div>

                      <a
                        className="video-link"
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {v.url}
                      </a>
                    </div>

                    <div className="card__top-right">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => startEdit(v)}
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleDelete(v.id)}
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <h3>Edit video</h3>
                      <span className="badge">id: {v.id}</span>
                    </div>

                    <div className="form form--compact">
                      <div>
                        <label>Title</label>
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label>URL</label>
                        <input
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="actions">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleSaveEdit(v.id)}
                          disabled={isLoading}
                        >
                          Save
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={cancelEdit}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  }}