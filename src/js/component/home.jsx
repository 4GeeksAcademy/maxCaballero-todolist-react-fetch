import React, { useState, useEffect } from "react";
import "../../styles/home.css";

// Create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/tareas/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(tareas),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.text(); // Retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then((text) => {
        console.log(text);
        return JSON.parse(text);
      })
      .then((data) => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
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
