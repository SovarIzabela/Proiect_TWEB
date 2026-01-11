import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:3000/api";//backend

export default function Login() {
  const [email, setEmail] = useState("");//ce seteaza userul in formular
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");//mesaj de eroare gen email invalid
  const [isLoading, setIsLoading] = useState(false);//dezactiveaza inputuri buton ca sa nu dai dublu submit

  const { login } = useAuth();//salveaza tokenul permite logarea
  const navigate = useNavigate();//permite redirect dupa login

  async function handleSubmit(e) {
    e.preventDefault();//opreste refres pag la submit , app ramane SPA
    setError("");// sterge orice valoare veche inainte de un nou login

    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/auth/login`, {//request catre backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),//trimte email , pass catre backend in forma de json
      });

      const data = await res.json();//citeste raspunsul backendului

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

           login(data.token);//autentificarea

      navigate("/playlists");//ajungi la pagina prncipala
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button className="btn btn-primary" disabled={isLoading}>
          Login
        </button>

        {error && <p>⛔ {error}</p>}



        <p>
          Nu ai cont creat? <Link to="/register">Register</Link>
        </p>


      </form>
    </div>
  );
}
