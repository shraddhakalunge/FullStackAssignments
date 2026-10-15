# Part A: Express.js REST API with MongoDB & Mongoose

This project demonstrates a full CRUD REST API using Express.js and MongoDB (via Mongoose).

## Running the Server
1. Ensure MongoDB daemon is running locally (`mongodb://127.0.0.1:27017/studentDB`).
2. Run:
```bash
npm install
node array.js
```
The server will start on port `3000`.

## Endpoints
- `GET /students` - Returns all students from MongoDB
- `POST /students` - Adds a student document (`{ name, city, marks }`)
- `PUT /students/:id` - Updates the student with MongoDB `_id`
- `DELETE /students/:id` - Deletes the student with MongoDB `_id`
