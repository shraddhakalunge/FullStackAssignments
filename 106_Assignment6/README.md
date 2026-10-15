# ⚛️ Assignment 6: React Counter Application

**Roll No:** 106  
**Author:** Shraddha Kalunge  
**Repository:** [FullStackAssignments](https://github.com/shraddhakalunge/FullStackAssignments)

---

## 📌 Project Overview
This project demonstrates an interactive **Counter Application** built using **React 19** and **Vite**. The primary objective of this assignment is to understand and implement React's foundational hook: `useState`, managing local component state reactively upon user interaction.

---

## 💡 Key Concepts Covered
1. **React Functional Components:** Declarative UI building with modern JavaScript.
2. **`useState` Hook:** React state hook that triggers component re-renders whenever state changes.
3. **Event Handling:** Attaching inline arrow functions to button `onClick` handlers.
4. **Vite Tooling:** Fast development server and module bundling.

---

## 🚀 Features
- ➕ **Increase:** Increments the counter by 1 (`setCount(count + 1)`).
- ➖ **Decrease:** Decrements the counter by 1 (`setCount(count - 1)`).
- 🔄 **Reset:** Resets the counter value back to 0 (`setCount(0)`).

---

## 📂 Project Structure
```
106_Assignment6/
├── index.html            # Main HTML entry and interactive showcase
├── package.json          # Project metadata & dependencies (React 19, Vite)
├── package-lock.json     # Dependency lockfile
├── vite.config.js        # Vite configuration with @vitejs/plugin-react
├── .oxlintrc.json        # Oxlint linter configuration
├── .gitignore            # Git ignore rules for node_modules/
├── public/               # Static assets (favicons, SVGs)
└── src/
    ├── App.jsx           # Main Counter component with useState
    ├── App.css           # Styling for counter container, card & buttons
    ├── index.css         # Global styles
    ├── main.jsx          # React DOM root render
    └── assets/           # React and Vite logo assets
```

---

## 💻 Source Code Snippet (`src/App.jsx`)
```jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="counter">
        <h2>Counter: {count}</h2>

        <button onClick={() => setCount(count + 1)}>
          Increase
        </button>

        <button onClick={() => setCount(count - 1)}>
          Decrease
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
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
   cd FullStackAssignments/106_Assignment6
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
