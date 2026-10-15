# 📝 Assignment 8: React Todo List CRUD Application

**Roll No:** 106  
**Author:** Shraddha Kalunge  
**Repository:** [FullStackAssignments](https://github.com/shraddhakalunge/FullStackAssignments)

---

## 📌 Project Overview
This project is a **Todo List Application** created with **React 19** and **Vite**. It implements complete **CRUD (Create, Read, Update, Delete)** operations on in-memory tasks using React's `useState` hook with proper immutable state updates.

---

## 💡 Key Concepts Covered
1. **React State with Arrays & Objects:**
   - Managing array state `list` via `useState([])`.
   - Managing input state `task` via `useState("")`.
   - Managing edit tracking `editIndex` via `useState(-1)`.
2. **Immutable CRUD Operations:**
   - **Create (Add Task):** `setList([...list, task])`
   - **Read (Display Tasks):** `list.map((item, index) => (...))` with unique `key` prop.
   - **Update (Edit Task):** `list[editIndex] = task; setList([...list]); setEditIndex(-1)`
   - **Delete (Remove Task):** `setList(list.filter((_, i) => i !== index))`
3. **Conditional Rendering:**
   - Renders a friendly "No tasks added yet!" message when `list.length === 0`.
   - Dynamic button label: `"Add Task"` vs `"Update Task"` based on `editIndex`.

---

## 📂 Project Structure
```
106_Assignment8/
├── index.html            # Main HTML entry and interactive showcase
├── package.json          # Dependencies (React 19, Vite)
├── package-lock.json     # Dependency lockfile
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── .gitignore            # Git ignore rules for node_modules/
├── public/               # Static assets (favicons, SVGs)
└── src/
    ├── App.jsx           # Main Todo List CRUD component
    ├── App.css           # Styling for container, task items, inputs, and buttons
    ├── index.css         # Global styling
    ├── main.jsx          # React DOM root render
    └── assets/           # React and Vite logo assets
```

---

## 💻 Source Code Snippet (`src/App.jsx`)
```jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  function addTask() {
    if (task === "") {
      alert("Please enter a task");
      return;
    }

    if (editIndex === -1) {
      setList([...list, task]);
    } else {
      list[editIndex] = task;
      setList([...list]);
      setEditIndex(-1);
    }

    setTask("");
  }

  function editTask(index) {
    setTask(list[index]);
    setEditIndex(index);
  }

  function deleteTask(index) {
    setList(list.filter((item, i) => i !== index));
  }

  return (
    <div className="container">
      <h1>My Todo List</h1>
      <p>Manage your daily tasks easily</p>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          {editIndex === -1 ? "Add Task" : "Update Task"}
        </button>
      </div>

      <h2>My Tasks</h2>

      {list.length === 0 ? (
        <p>No tasks added yet!</p>
      ) : (
        list.map((item, index) => (
          <div className="task" key={index}>
            <span>{item}</span>

            <div>
              <button
                className="edit-btn"
                onClick={() => editTask(index)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
```

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shraddhakalunge/FullStackAssignments.git
   cd FullStackAssignments/106_Assignment8
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to the local URL displayed in the terminal (usually `http://localhost:5173`).
