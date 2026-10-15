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