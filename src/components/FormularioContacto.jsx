import { useState } from "react";

const camposIniciales = {
  nombre: "",
  telefono: "",
  correo: "",
  etiqueta: "",
  empresa: "",
};

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState(camposIniciales);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) {
      alert("Nombre, teléfono y correo son obligatorios.");
      return;
    }
    onAgregar(form);
    setForm(camposIniciales);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 mb-6"
    >
      <h2 className="text-xl font-bold text-morado-oscuro">Nuevo contacto</h2>

      <div>
        <label className="text-sm font-semibold block mb-1">Nombre *</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Ana López"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">Teléfono *</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="Ej: 300 123 4567"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">Correo *</label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: ana@correo.com"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">
          Empresa (opcional)
        </label>
        <input
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej: SENA"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">
          Etiqueta (opcional)
        </label>
        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: amigo, trabajo..."
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <button
        type="submit"
        className="bg-morado hover:bg-morado-oscuro text-white py-2 rounded-md font-semibold transition-colors"
      >
        Agregar contacto
      </button>
    </form>
  );
}