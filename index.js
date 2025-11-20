const express = require("express");
const app = express();

app.use(express.json());

// In-memory array of students
let students = [
  { id: 1, name: "Amit", marks: 85 },
  { id: 2, name: "Rahul", marks: 92 },
  { id: 3, name: "Sneha", marks: 78 },
  { id: 4, name: "Priya", marks: 88 },
  { id: 5, name: "Rohan", marks: 95 }
];


// 1. GET /students → Return all students
app.get("/students", (req, res) => {
  res.json(students);
});

// 2. POST /students → Add a new student
app.post("/students", (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined) {
    return res.status(400).json({ error: "Name and marks are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    marks
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 3. GET /students/:id → Return student by ID
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
