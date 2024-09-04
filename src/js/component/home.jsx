import React, { useState } from "react";
import ".././styles/home.css";

// Create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Ensure input is not empty
      setTareas([...tareas, inputValue]); // Use spread operator for better readability
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    setTareas(tareas.filter((_, idx) => idx !== index)); // Improved clarity
  };

  return (
    <div className="contenedor-principal">
      <h1>Mis tareas</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={handleKeyPress}
            placeholder="Escribe una tarea..."
          />
        </li>
        {tareas.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDelete(index)}
            ></i>
          </li>
        ))}
      </ul>
      <h2>
        {tareas.length} tarea{tareas.length !== 1 ? "s" : ""}
      </h2>
    </div>
  );
};

export default Home;
