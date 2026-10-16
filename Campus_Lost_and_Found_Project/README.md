# Campus Lost and Found

A beginner-friendly full-stack mini project using **React**, **Node.js + Express**, and **MongoDB**.

## Features
- Add Lost or Found notices
- View all notices
- Search notices by item name, description, location, or contact
- Filter by Lost/Found and Open/Returned
- Edit a notice
- Mark an item as Returned
- Delete a notice with confirmation
- Dashboard totals
- MongoDB persistence

## Requirements
Install Node.js (LTS) and have MongoDB running locally, or use a MongoDB Atlas connection string.

## 1. Set up the backend
Open a terminal in the `backend` folder:
```bash
npm install
```
Copy `.env.example` to `.env` and edit it if needed. The default connection string is:
`mongodb://127.0.0.1:27017`

Start the backend:
```bash
npm run dev
```
The API runs at `http://localhost:5000`.

## 2. Set up the frontend
Open a second terminal in the `frontend` folder:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## If using MongoDB Atlas
Put your Atlas connection string in `backend/.env` as `MONGO_URI=...`. Keep the database name as `campus_lost_found` in the code/connection options, or include it in the URI.

## Demo flow for tomorrow
1. Add a Lost item (e.g. Blue water bottle).
2. Add a Found item (e.g. Scientific calculator).
3. Search for "calculator".
4. Filter by Found.
5. Click "Mark returned" on an open notice.
6. Edit a notice.
7. Delete a demo notice.
8. Restart the backend and show that records remain in MongoDB.

## Important
This is a local classroom prototype. It has no login, so anyone who can access it can manage notices. Use fictional demo contact details.

## Pages (faculty requirement)
- **Home page**: project introduction and how-it-works section.
- **Login page**: demo student login form.
- **Noticeboard page**: dashboard, search/filter, create/edit/return/delete reports.

Demo login accepts any valid email address and a password of at least 4 characters. This is intentionally a UI-only classroom demo, not secure authentication. Explain this limitation honestly during viva.
