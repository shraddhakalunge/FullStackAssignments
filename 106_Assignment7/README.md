# 🧭 Assignment 7: Multi-Page React Routing Application

**Roll No:** 106  
**Author:** Shraddha Kalunge  
**Repository:** [FullStackAssignments](https://github.com/shraddhakalunge/FullStackAssignments)

---

## 📌 Project Overview
This project demonstrates **client-side routing** in a Single Page Application (SPA) using **React Router (v7)** and **Vite**. The application consists of two routed pages:
1. **Input Page (`/`):** A form where the user inputs their **Name** and **City**.
2. **Display Page (`/display`):** A summary page that displays the entered details.

---

## 💡 Key Concepts Covered
1. **React Router DOM (`react-router-dom` v7):**
   - `<BrowserRouter>`: Provides the routing context using browser history.
   - `<Routes>` and `<Route>`: Defines component mappings to URL paths.
   - `useNavigate` hook: Programmatically navigates between routes upon button click (`navigate("/display")`).
2. **State Lifting & Props:**
   - State (`name`, `city`) is lifted up to parent `<App />`.
   - Setter functions (`setName`, `setCity`) are passed as props to `<Input />`.
   - State values (`name`, `city`) are passed as props to `<Display />`.

---

## 📂 Project Structure
```
106_Assignment7/
├── index.html            # Main HTML entry and interactive showcase
├── package.json          # Dependencies (React 19, react-router-dom v7, Vite)
├── package-lock.json     # Dependency lockfile
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── .gitignore            # Git ignore rules for node_modules/
├── public/               # Static assets (favicons, SVGs)
└── src/
    ├── App.jsx           # Main App with BrowserRouter, Routes & State
    ├── App.css           # Styling for container, cards, inputs, and buttons
    ├── index.css         # Reset & global styles
    ├── main.jsx          # React DOM root render
    ├── components/
    │   ├── Input.jsx     # Input form page with useNavigate
    │   └── Display.jsx   # Details display page
    └── assets/           # React and Vite logo assets
```

---

## 💻 Source Code Snippets

### `src/App.jsx`
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Input from "./components/Input.jsx";
import Display from "./components/Display.jsx";

function App() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Input
              setName={setName}
              setCity={setCity}
            />
          }
        />

        <Route
          path="/display"
          element={
            <Display
              name={name}
              city={city}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### `src/components/Input.jsx`
```jsx
import { useNavigate } from "react-router-dom";
import "../App.css";

function Input({ setName, setCity }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1>Enter Your Details</h1>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={() => navigate("/display")}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Input;
```

### `src/components/Display.jsx`
```jsx
import "../App.css";

function Display({ name, city }) {
  return (
    <div className="container">
      <div className="card">
        <h1>Your Details</h1>

        <h2>
          Name: <span>{name || "Not entered"}</span>
        </h2>

        <h2>
          City: <span>{city || "Not entered"}</span>
        </h2>
      </div>
    </div>
  );
}

export default Display;
```

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shraddhakalunge/FullStackAssignments.git
   cd FullStackAssignments/106_Assignment7
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
