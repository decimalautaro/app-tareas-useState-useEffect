import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ControlVisibilidad } from "./components/ControlVisibilidad";
import { CreadorTarea } from "./components/CreadorTarea";
import { TablaTareas } from "./components/TablaTareas";

function App() {
  const [listarTareas, setListarTareas] = useState([]);
  const [mostrarEstado, setMostrarEstado] = useState(true);

  function crearNuevaTarea(nombreTarea) {
    if (!listarTareas.find((tarea) => tarea.name === nombreTarea)) {
      setListarTareas([...listarTareas, { name: nombreTarea, hecha: false }]);
    }
  }
  const alternarTarea = (tarea) => {
    setListarTareas(
      listarTareas.map((t) =>
        t.name === tarea.name ? { ...t, hecha: !t.hecha } : t
      )
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("tareas");
    if (data) {
      setListarTareas(JSON.parse(data));
    }
  }, []);

  const limpiarTareas = () => {
    setListarTareas(listarTareas.filter((tarea) => !tarea.hecha));
    setMostrarEstado(false);
  };

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(listarTareas));
  }, [listarTareas]);

  return (
    <main className="bg-secondary font-monospace fw-bold vh-100 text-white">
      <div className="container col-md-4 offset-md-4 p-4">
        <CreadorTarea crearNuevaTarea={crearNuevaTarea} />

        <TablaTareas tareas={listarTareas} alternarTarea={alternarTarea} />
        <ControlVisibilidad
          isChecked={mostrarEstado}
          setMostrarEstado={(checked) => setMostrarEstado(checked)}
          limpiarTareas={limpiarTareas}
        />

        {mostrarEstado === true && (
          <TablaTareas
            tareas={listarTareas}
            alternarTarea={alternarTarea}
            mostrarEstado={mostrarEstado}
          />
        )}
      </div>
    </main>
  );
}

export default App;
