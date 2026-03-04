import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  function agregarContacto(nuevoContacto) {
    setContactos([...contactos, nuevoContacto]);
  }

  function eliminarContacto(index) {
    const nuevos = contactos.filter((_, i) => i !== index);
    setContactos(nuevos);
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-morado text-center mb-2">
        Agenda ADSO v4
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Interfaz moderna con TailwindCSS
      </p>

      <FormularioContacto onAgregar={agregarContacto} />

      <section>
        {contactos.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
            No hay contactos aún. ¡Agrega el primero!
          </p>
        ) : (
          contactos.map((contacto, index) => (
            <ContactoCard
              key={index}
              contacto={contacto}
              onEliminar={() => eliminarContacto(index)}
            />
          ))
        )}
      </section>
    </main>
  );
}