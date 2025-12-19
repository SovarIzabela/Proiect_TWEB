1.Autentificare
1.1Register user - creeaza un nou user
    POST/api/auth/register
Body (JSON):

{
  "name": "Izabela",
  "email": "iza@ase.ro",
  "password": "Ase123"
}


Răspuns 201 (Created):

{
  "id": 1,
  "name": "Izabela",
  "email": "iza@ase.ro"
}

erori posibile:
    400-> Bad request (lipsa campuri/email invalid/parola prea scurts)
    409->  Conflict - user existent
    500->Internal Server Error - eroare server
1.2 Login User
    POST /api/auth/login
Autentifica userul si intoarce un token JWT
{
  "email": "iza@ase.ro,
  "password": "Ase123"
}

Raspuns 200 ok
{
  "token": "jwttoken",
    "user": {
        "id": 1,
        "name": "Izabela",
        "email": "iza@ase.ro
  }
}

erori posibile:
    400 Bad request (lipsa campuri)
<<<<<<< HEAD
    401-Unothorize  Conflict -email sau parola gresita
=======
    401-Unaothorized  
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c
    500 Internal Server Error - eroare server

2. Playlist
Necesita autentificare
Header Obligatoriu : Authorization: Bearer <token>
2.1 Listare playlisturi user curent -> returneaza playlisturile asociate userului (din token)
<<<<<<< HEAD
    GET/api/playlist
=======
    GET/api/playlists
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c
Raspuns 200 OK
[
  {
    "id": 10,
    "name": "Tehnologii WEB",
    "createdAt": "2025-11-28"
  },
  {
    "id": 11,
    "name": "ASE",
    "createdAt": "2025-11-28"
  }
]

Erori posibile
    401 Unauthorized – token invalid
    500 Internal Server Error -eroare server

2.2 Creare playlist nou - creeaza un nou playlist pentru userul curent
    POST /api/playlists
{
  "name": "Tehnologii WEB",
}

Raspuns 201 ok
{
  "id": 10,
  "name": "Tehnologii WEB",
  "createdAt": "2025-11-28"
}

Erori posibile:
    400 Bad Request 
    401 Unauthorized
    500 Internal Server Error

2.3 Stregere playlist - sterge playlistul cu id-ul dat daca apartine userului curent

<<<<<<< HEAD
DELETE /api/playlist/:id
=======
DELETE /api/playlists/:id
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c
id - id numeric sau UUID al playlistuui

Raspuns 200 -> OK
{
  "message": "Playlist deleted!"
}

Erori posibile:
    401 Unauthorized
    403 Forbidden – playlist-ul nu apartine userului curent
    404 Not Found – nu există playlist cu acest id
    500 Internal Server Error eroare server


3.  Video favorite
Necesita autentificare
Header Obligatoriu : Authorization: Bearer <token>

3.1 Adaugare video in playlist - adauga video in playlist
    POST /api/videos/:playlistId
Path params :playlistId – ID-ul playlist-ului in care se adauga video

{
  "youtubeId": "jkkvjkdl",
  "title": "Proiect TWEB",
}

Raspuns 201 Created
{
  "id": 100,
 "youtubeId": "jkkvjkdl",
  "title": "Proiect TWEB",
  "addedAt": "2025-11-28"
}

Erori posibile:
400 Bad Request – câmpuri lipsă 
401 Unauthorized
403 Forbidden – playlist-ul nu apartine userului curent
404 Not Found – playlist-ul nu există
500 Internal Server Error - eroare server


3.2 Listare video in playlist - listeaza toate videoclipurile asiciate unui playlist
GET /api/videos/:playlistId
Path params :playlistId – ID-ul playlist-ului in care se adauga video
Raspuns 200 ok
<<<<<<< HEAD
=======
[
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c
{
  "id": 100,
 "youtubeId": "jkkvjkdl",
  "title": "Proiect TWEB",
  "addedAt": "2025-11-28"
},
{
  "id": 101,
 "youtubeId": "jkkvjkdl",
  "title": "Proiect TWEB",
  "addedAt": "2025-11-29"
<<<<<<< HEAD
}
=======
}]
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c

Erori posibile:
401 Unauthorized
403 Forbidden – playlist-ul nu apartine userului curent
404 Not Found – playlist-ul nu există
500 Internal Server Error - eroare server


3.3 Stergere video din playlist - sterge video favorit dupa Id ul intern al aplocatiei
DELETE /api/videos/:id
<<<<<<< HEAD
Path params :playlistId – ID-ul intern al inregistrarii video
=======
Path params :id – ID-ul intern al inregistrarii video
>>>>>>> 2ab614c91472f26f0a37aa20c5fa85c7add01d8c

Raspuns 200 OK
{
  "message": "Video deleted with succes!!"
}

Erori posibile:

401 Unauthorized
403 Forbidden – video-ul nu apartine unui playlist al userului curent
404 Not Found – nu există video cu acest id
500 Internal Server Error