
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
