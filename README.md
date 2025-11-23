# Proiect_TWEB
Manager_videoclipuri_integrat_cu_YouTube

Aplicatia permite utilizatorilor sa:
->caute videoclipuri pe You Tube
->vizualizeze videoclipurile intr-o interfata simpla
->sa salveze videoclipurile preferate in playlist-uri personale
->adaugare videoclip si stergere videoclip din playlist
->poate sa revada ulterior videoclipurile salvate

Aplicatia va avea:
->un back-end RESTful construit cu Node.js si Express,
->o baza date Prisma ORM si SQL lite,
->interfata web (SPA) realizata cu React.js
->integrarea directa cu Yout tube Search API

Prin aceasta aplicatie voi urmari:
->implementarea unui serviciu REST
->lucru bu baza de date folosind un ORM
->gestionarea utilizatoriloe si a datelor personale
->consumarea unui API extern YouTube
->dezvoltarea unei aplicatii front de tip Single Page Aplication
->utilizarea autentificarii cu Token (JWT) pentru protejarea datelor.

Arhitectura aplicatiei:
Back-end: va expune un set de end point-uri REST:
Autentificare :
     POST/api/auth/register ; POS/api/auth/login
Playlist-uri:
    GET /api/playlist; POST /api/playlist; DELETE /api/playlist/:id 
Video favorite:
    POST / api/video/:playlistID ; GET / api/videos/:playlistID; DELETE /api/videos/:id

Back-endul va verifica autentificarea si va atasa utilizatorului doar playlisturile si videoclipurile proprii.

Front-end - ul va contine :
 ->Login
 ->Register
 ->Lista playlist
 ->Cautare video Yt
 ->Vizualizare video favorite
 ->Player video integrat(iframe)

React va comunica cu back-end prin Fetch/Axios si va afisa raspunsurile sub forma de componente.

Model BD
Baza de date va avea 3 entitati :
 1. User: id, name, email, pass , relatie 1:N cu Playlist
 2. Playlist: id, name, userId, realtie 1:N cu FavoriteVideo
 3. FavoriteVideo : id, youtubeId, title, thumbnailURL, playlistId


Functionalitati dorite:
Autentificare user: inregistrare cont nou, login, token JWT salvat in localStorage
Integrare YT: userul cauta un termen-> aplicatia trimite cererea la YT API ->returneaza titlul si id video.
Playlist-uri : listare playlist, creare playlist nou, stergere playlist
Video favorite: adaugare video in playlist, stergere video din playlist, afisare video favorite, vizionare video direct in pagina


 

     

