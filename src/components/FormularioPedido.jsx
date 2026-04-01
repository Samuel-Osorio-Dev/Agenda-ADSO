import { useEffect, useState } from "react";

export default function FormularioPedido({ onAgregar, onActualizar, pedidoEnEdicion, onCancelarEdicion }) {
  const [form, setForm] = useState({
    cliente: "",
    telefono: "",
    direccion: "",
    pedido: "",
    estado: "pendiente",
  });

  const [errores, setErrores] = useState({
    cliente: "",
    telefono: "",
    direccion: "",
    pedido: "",
  });

  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (pedidoEnEdicion) {
      setForm({
        cliente: pedidoEnEdicion.cliente || "",
        telefono: pedidoEnEdicion.telefono || "",
        direccion: pedidoEnEdicion.direccion || "",
        pedido: pedidoEnEdicion.pedido || "",
        estado: pedidoEnEdicion.estado || "pendiente",
      });
      setErrores({ cliente: "", telefono: "", direccion: "", pedido: "" });
    } else {
      setForm({ cliente: "", telefono: "", direccion: "", pedido: "", estado: "pendiente" });
      setErrores({ cliente: "", telefono: "", direccion: "", pedido: "" });
    }
  }, [pedidoEnEdicion]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validarFormulario() {
    const nuevosErrores = { cliente: "", telefono: "", direccion: "", pedido: "" };

    if (!form.cliente.trim()) nuevosErrores.cliente = "El nombre del cliente es obligatorio.";
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }
    if (!form.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria.";
    if (!form.pedido.trim()) nuevosErrores.pedido = "El pedido es obligatorio.";

    setErrores(nuevosErrores);
    return !nuevosErrores.cliente && !nuevosErrores.telefono && !nuevosErrores.direccion && !nuevosErrores.pedido;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setEnviando(true);
      if (pedidoEnEdicion) {
        await onActualizar({ ...form, id: pedidoEnEdicion.id });
        setForm({ cliente: "", telefono: "", direccion: "", pedido: "", estado: "pendiente" });
        setErrores({ cliente: "", telefono: "", direccion: "", pedido: "" });
        if (onCancelarEdicion) onCancelarEdicion();
      } else {
        await onAgregar(form);
        setForm({ cliente: "", telefono: "", direccion: "", pedido: "", estado: "pendiente" });
        setErrores({ cliente: "", telefono: "", direccion: "", pedido: "" });
      }
    } finally {
      setEnviando(false);
    }
  };

  const estaEnEdicion = Boolean(pedidoEnEdicion);

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">{estaEnEdicion ? "Editar pedido" : "Nuevo pedido"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            name="cliente"
            placeholder="Ej: Camila Pérez"
            value={form.cliente}
            onChange={onChange}
          />
          {errores.cliente && <p className="mt-1 text-xs text-red-600">{errores.cliente}</p>}
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
          {errores.telefono && <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          name="direccion"
          placeholder="Ej: Calle 10 #20-30"
          value={form.direccion}
          onChange={onChange}
        />
        {errores.direccion && <p className="mt-1 text-xs text-red-600">{errores.direccion}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pedido *</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          name="pedido"
          placeholder="Ej: Bandeja paisa"
          value={form.pedido}
          onChange={onChange}
        />
        {errores.pedido && <p className="mt-1 text-xs text-red-600">{errores.pedido}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
        >
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div className="pt-2 flex flex-col md:flex-row md:items-center gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition"
        >
          {enviando ? "Guardando..." : estaEnEdicion ? "Guardar cambios" : "Agregar pedido"}
        </button>
        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200 text-sm"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}