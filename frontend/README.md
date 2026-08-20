# 🎬 FilmSayti

Full-stack film platforması — React, Node.js, Express, MongoDB.

## Struktur

movie_project/
├── backend/ → Node.js + Express + MongoDB API
└── frontend/ → React + Redux Toolkit + SCSS


## Texnologiyalar
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Express-validator
**Frontend:** React (Vite), Redux Toolkit, React Router, SCSS, Axios

## Quraşdırma

**Backend:**
```bash
cd backend
npm install
```
`.env` yarat:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

```bash
node utils/seedAdmin.js    # admin hesabı yaradır
node utils/seedMovies.js   # nümunə filmlər yükləyir
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Funksionallıq
- Qeydiyyat/Giriş — bcrypt + JWT
- Rol sistemi (user/admin) — admin panel üzərindən film CRUD
- Pagination, axtarış, janr/il/rejissor filtri
- Wishlist (əlavə et/sil, tövsiyə edilən filmlər)
- Login olmadan film detalına giriş yoxdur
- Dark/Light tema, tam responsive dizayn

## API
| Metod | Endpoint | Açıqlama |
|---|---|---|
| POST | `/api/auth/register` | Qeydiyyat |
| POST | `/api/auth/login` | Giriş |
| GET | `/api/movies` | Filmlər (pagination/filtr) |
| POST/PUT/DELETE | `/api/movies/:id` | CRUD (admin) |
| GET/POST/DELETE | `/api/wishlist` | Wishlist |
