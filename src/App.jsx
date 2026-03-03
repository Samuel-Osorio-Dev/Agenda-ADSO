import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {

  // Carga inicial desde localStorage (si hay datos guardados, los usa; si no, array vacío)
  const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || [];
  const [contactos, setContactos] = useState(contactosGuardados);

  // Cada vez que cambia el estado, guarda automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  // Agregar contacto
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  // Eliminar contacto por correo
  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v3 📒</h1>
      <p className="subtitulo">Persistencia con localStorage + UI moderna</p>

      <FormularioContacto onAgregar={agregarContacto} />

      {contactos.map((c) => (
        <ContactoCard
          key={c.correo}
          {...c}
          onEliminar={eliminarContacto}
        />
      ))}
    </main>
  );
}