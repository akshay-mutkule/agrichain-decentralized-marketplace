# AgriChain Full-Stack Demo

This project now includes:

- A React frontend that renders the AgriChain-style landing page
- A lightweight Node backend with JSON-backed APIs
- Working demo request, contact, and login flows

## Run locally

Start frontend and backend together:

```bash
npm run dev
```

Frontend:

- `http://localhost:3000`

Backend:

- `http://localhost:5000/api/health`

## Available scripts

- `npm run dev` starts both frontend and backend
- `npm run server` starts only the backend
- `npm start` starts only the React frontend
- `npm run build` creates a production frontend build

## Demo login

- Email: `admin@agrichain.demo`
- Password: `Demo@123`

## Backend data

JSON files live in `server/data/`:

- `homepage.json` for homepage content
- `users.json` for demo accounts
- `submissions.json` for saved demo/contact/login records
