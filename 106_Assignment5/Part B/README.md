# Part B: Express.js REST API with In-Memory Array

This project demonstrates a simple Express REST API performing full CRUD operations on an in-memory array.

## Running the Server
```bash
npm install
node server.js
```
The server will start on port `3000`.

## Endpoints
- `GET /students` - Returns list of all students
- `POST /students` - Adds a student object from JSON body
- `PUT /students/:index` - Updates the student at index with JSON body
- `DELETE /students/:index` - Removes the student at index
