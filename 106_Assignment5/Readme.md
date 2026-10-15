# 106_Assignment5: Node.js & Express REST APIs

This assignment demonstrates building RESTful APIs using **Node.js** and **Express.js** with two different persistence mechanisms:

- **Part A:** Database-backed REST API using **MongoDB** and **Mongoose ODM**
- **Part B:** In-memory Array-backed REST API

---

## 📁 Project Structure

```
106_Assignment5/
├── Part A/
│   ├── array.js            # Express server with MongoDB / Mongoose CRUD
│   ├── package.json        # Dependencies (express, mongoose)
│   └── README.md           # Documentation for Part A
├── Part B/
│   ├── server.js           # Express server with in-memory array CRUD
│   ├── package.json        # Dependencies (express)
│   └── README.md           # Documentation for Part B
├── index.html              # Interactive API Showcase & Documentation
└── README.md               # Main Assignment 5 Documentation
```

---

## 🚀 Part A: Express.js with MongoDB (Mongoose)

### Setup & Execution
1. Navigate to Part A:
   ```bash
   cd "Part A"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure MongoDB daemon is running locally:
   ```
   mongodb://127.0.0.1:27017/studentDB
   ```
4. Start the server:
   ```bash
   node array.js
   ```
   *Server runs on `http://localhost:3000`*

### API Endpoints
| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/students` | Retrieve all student records | None |
| `POST` | `/students` | Add a new student record | `{"name": "Alice", "city": "Pune", "marks": 88}` |
| `PUT` | `/students/:id` | Update an existing student by MongoDB `_id` | `{"name": "Alice", "city": "Mumbai", "marks": 92}` |
| `DELETE` | `/students/:id` | Delete a student by MongoDB `_id` | None |

---

## ⚡ Part B: Express.js with In-Memory Array

### Setup & Execution
1. Navigate to Part B:
   ```bash
   cd "Part B"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *Server runs on `http://localhost:3000`*

### API Endpoints
| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/students` | Retrieve all students in array | None |
| `POST` | `/students` | Add a student to array | `{"name": "John", "roll": 101}` |
| `PUT` | `/students/:index` | Update a student at specific index | `{"name": "John Doe", "roll": 101}` |
| `DELETE` | `/students/:index` | Delete a student at specific index | None |