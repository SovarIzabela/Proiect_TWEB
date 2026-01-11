import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo.jsx";
import "../styles/navbar.css"

export default function Navbar() {
  const { token, logout } = useAuth();
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

          {token ? (
            <>
              <Link className="navlink" to="/playlists">Playlists</Link>
              <Link className="navlink" to="/search">Search</Link>
              <button className="btn-danger" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="navlink" to="/login">Login</Link>
              <Link className="navlink" to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
