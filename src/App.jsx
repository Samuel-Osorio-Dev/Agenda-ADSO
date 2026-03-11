// src/App.jsx
// Componente principal de la Agenda ADSO.
// Maneja los contactos, estados de carga, errores, búsqueda y ordenamiento.

import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // === NUEVOS ESTADOS CLASE 10 ===
  // Estado para el término de búsqueda digitado por el usuario
  const [busqueda, setBusqueda] = useState("");
  // Estado para el orden: true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Carga los contactos al iniciar la app
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError("No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  // Agrega un nuevo contacto
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError("No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente.");
      throw error;
    }
  };

  // Elimina un contacto por id
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor.");
    }
  };

  // === LÓGICA DE BÚSQUEDA Y ORDENAMIENTO (CLASE 10) ===
  // 1. Filtramos por nombre, correo, etiqueta y teléfono (mini reto)
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre   = c.nombre.toLowerCase();
    const correo   = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase();
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // 2. Ordenamos los contactos filtrados por nombre
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado usando APP_INFO desde config.js */}
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>
        <p className="text-gray-500 mt-1">
          {APP_INFO.subtitulo}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        <FormularioContacto onAgregar={agregarContacto} />

        {/* Buscador y botón de orden */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <input
            type="text"
            className="w-full md:flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm outline-none"
            placeholder="Buscar por nombre, correo o etiqueta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
          >
            {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
          </button>
        </div>

        {/* Mini reto 2: cantidad de resultados */}
        <p className="text-sm text-gray-500">
          Mostrando {contactosOrdenados.length} {contactosOrdenados.length === 1 ? "contacto" : "contactos"}
        </p>

        {/* Listado de contactos filtrados y ordenados */}
        <section className="space-y-4">
          {contactosOrdenados.length === 0 ? (
            <p className="text-sm text-gray-500">
              No se encontraron contactos que coincidan con la búsqueda.
            </p>
          ) : (
            contactosOrdenados.map((c) => (
              <ContactoCard
                key={c.id}
                nombre={c.nombre}
                telefono={c.telefono}
                correo={c.correo}
                etiqueta={c.etiqueta}
                onEliminar={() => eliminarContacto(c.id)}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
}