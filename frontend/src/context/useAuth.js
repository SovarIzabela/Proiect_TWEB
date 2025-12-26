import { useContext } from "react";
import { AuthContext } from "./AuthContext";
//hook personalizat pentru a accesa contextul de autentificare.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
