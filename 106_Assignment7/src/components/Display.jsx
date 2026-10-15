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