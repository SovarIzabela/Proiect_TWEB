import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";//redirectionam dupa logout daca tokenul expira
import { apiAuthFetch } from "../services/apiAuthFetch";//fetch cu tokenul in header
import { useAuth } from "../context/useAuth";

;//citeste tokenul si functia logout





export default function Playlists() {

  const {token, logout} = useAuth();
  const navigate = useNavigate();//functia de navigare/redirectionare
  const [playlists, setPlaylists] = useState([]);//lista de playlisturi venite de la backend
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {//cand pagina se incarca ruleaza acest cod
    const controller = new AbortController();//pentru a anula fetch-ul daca userul paraseste pagina

    async function fetchPlaylists() {
      try {
      setIsLoading(true);
      setError("");

      const data = await apiAuthFetch("/playlists", {//fetch catre backend
       token,
       logout,
       navigate,
       
      });

      setPlaylists(data); //declanseaza rerandarea si UI se actualizeaza

    } catch (err) {
        setError(err.message || "Something went wrong");
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchPlaylists();//apeleaza functia de fetch
    return () => {
      controller.abort();//anuleaza fetch-ul daca parasim pagina
    };
  }, [token, navigate, logout]);

  if(isLoading){
    return <h1>Loading Playlists...</h1>;
  }

  if(error){
    return <p>{error} ❌</p>;
  }

  return (
  <div>
    <h1>ReactPlay - Playlists Page</h1>

    {playlists.length === 0 ? (
      <p>No playlists found. Please create one!</p>  ) : (
      <ul >
        {playlists.map((p) => (  
          <li key={p.id} >
            <strong>{p.name}</strong> - {p.descriere} ({p.videoCount})
          </li>
        ))}
      </ul>
    )}  
  </div>
  )

}
