const express = require("express");
const app = express();

app.use(express.json());

let students = [];

// GET - show all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST - add a student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.send("Student added");
});

// PUT - update a student
app.put("/students/:index", (req, res) => {
    students[req.params.index] = req.body;
    res.send("Student updated");
});

// DELETE - delete a student
app.delete("/students/:index", (req, res) => {
    students.splice(req.params.index, 1);
    res.send("Student deleted");
});

app.listen(3000, () => {
    console.log("Server started");
});