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