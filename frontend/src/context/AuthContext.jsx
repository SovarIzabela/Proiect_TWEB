import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);//spatiu global pentru autentificare. Initial este null pentru ca utilizatorul nu este autentificat.

export function AuthProvider({ children }) {//componentei AuthProvider i se trece ca si copil componentele care vor avea acces la contextul de autentificare.
  const [token, setToken] = useState(() => localStorage.getItem("token"));//starea token-ului este initializata cu valoarea din localStorage, daca exista.

  useEffect(() => {
    if (token) localStorage.setItem("token", token);//daca token-ul exista, il salvam in localStorage.
    else localStorage.removeItem("token");//daca token-ul nu exista, il eliminam din localStorage.
  }, [token]);

  function login(newToken) {//functie pentru autentificare, care seteaza token-ul.
    setToken(newToken);
  }

  function logout() {//functie pentru deautentificare, care elimina token-ul.
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      
      {children}
    </AuthContext.Provider>
  );
}
