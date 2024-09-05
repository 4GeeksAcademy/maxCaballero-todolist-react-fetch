import React, { useState, useEffect } from "react";
import "../../styles/home.css";

// Create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    if (tareas.length > 0) {
      fetch("https://playground.4geeks.com/todo/docs", {
        method: "PUT",
        body: JSON.stringify(tareas),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Error en la red");
          }
          return resp.json();
        })

        .then((data) => {
          // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
        })
        .catch((error) => {
          // Manejo de errores
          console.log(error);
        });
    }
  }, [tareas]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Ensure input is not empty
      setTareas([...tareas, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    setTareas(tareas.filter((_, idx) => idx !== index));
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
