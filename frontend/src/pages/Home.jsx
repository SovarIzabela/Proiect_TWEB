import { Link } from "react-router-dom";

export default function Home() {
  return(
    <div className="home-page">
     <h1>ReactPlay - HomePage</h1>
          <p> Creaza si organizeaza playlisturile tale preferate intr-un singur loc</p>
          <p>
                ReactPlay este o aplicatie web moderna construita cu React, care iti permite sa creezi, 
                gestionezi si explorezi playlisturi muzicale personalizate.
                Fie ca esti un pasionat de muzica sau doar vrei sa iti organizezi melodiile preferate, 
                ReactPlay iti ofera toate instrumentele necesare pentru a-ti crea experienta muzicala ideala.
          </p>
      <div className="actions">
           <Link to ="/playlists" className="btn btn-primary">
            Vezi Playlisturile
            </Link>

           <Link to ="/search" className="btn btn-secondary">
             Adauga Muzica
            </Link>

      </div>
  </div>
    );
}


