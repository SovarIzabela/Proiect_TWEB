import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    //userul se dconecteaza
    logout();
    //redirectionare catre pagina de login
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">

           <Logo />

          <nav className="navlinks">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/playlists">Playlists</Link>
                <Link className="navlink" to="/search">Search</Link>
              <button className="btn btn-danger" onClick={handleLogout}>  
                Logout
                </button>
          </nav>
      </div>
    </header>
  );
}
