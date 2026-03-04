import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", empresa: "", etiqueta: "" });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Nuevo contacto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo *</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Empresa (opcional)</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          name="empresa"
          placeholder="Ej: SENA CTMA"
          value={form.empresa}
          onChange={onChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta (opcional)</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition">
        Agregar contacto
      </button>
    </form>
  );
}