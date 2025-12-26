const BASE_URL = "http://localhost:3000/api";

export async function apiAuthFetch(
  path,//partea de Url dupa api adica de ex: /videos/3 , /playlists
  { token, logout, navigate, method = "GET", body } = {}//al doilea parametru un obiect de optiuni.{}permite apel fara optiuni
) {
  const res = await fetch(`${BASE_URL}${path}`, {//construieste Url complet (ex:http://localhost:3000/api + /videos/3)
    method, //GET / POST / PATCH / DELETE
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,  //daca trimite body le converteste in json , daca nu undefined nu trimite body
  });

  if (res.status === 401) {
    if (logout) logout();//sterg token din context
    if (navigate) navigate("/login"); //redirectionez la pag de login
    throw new Error("Session expired. Please login again.");
  }

  const data = await res.json().catch(() => ({}));//citesc Json , daca backend nu trimite json primesc{}, fara sa crape app

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;//daca totul este ok componenta primeste datele si continua
}
