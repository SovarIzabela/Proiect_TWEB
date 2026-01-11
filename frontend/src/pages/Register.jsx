import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api";//backend

export default function Register() {
  const [name, setName] = useState(""); //ce introduce userul name, email , pass
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    if (!email.trim()) return setError("Email este obligatoriu.");
    if (!password.trim()) return setError("Parola este obligatorie.");
    if (!confirmPassword.trim()) return setError("Confirmarea parolei este obligatorie.");

    try {
      setIsLoading(true);

         if (password !== confirmPassword) {
        return setError("Parolele nu coincid!");
        }

      const res = await fetch(`${BASE_URL}/auth/register`, {//
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Register failed");
      }

      setOk("Cont creat! Acum te poți loga cu credentialele salvate.");
            navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Name (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="ex: Iza"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="iza@ase.ro"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="min 6 caractere"
          />
        </div>

        <div>
             <label>Confirm password</label>
                 <input
                     type="password"
                        value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                    placeholder="reintrodu parola"
                        />
        </div>

        <button className="btn btn-primary" disabled={isLoading}>
          Create account
        </button>

        {error && <p>⛔ {error}</p>}
        {ok && <p>{ok}</p>}

        <p>
          Ai deja cont? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
