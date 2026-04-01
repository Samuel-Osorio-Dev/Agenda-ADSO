export default function PedidoCard({ cliente, telefono, direccion, pedido, estado, onEliminar, onEditar }) {
  const estadoEstilo = {
    pendiente: "bg-yellow-100 text-yellow-800",
    entregado: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{cliente}</h3>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">📞</span>
          {telefono}
        </p>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">📍</span>
          {direccion}
        </p>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">🛵</span>
          {pedido}
        </p>
        <span className={`inline-block text-xs px-3 py-1 rounded-full mt-2 font-medium ${estadoEstilo[estado] || "bg-gray-100 text-gray-700"}`}>
          {estado}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEditar}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg border border-gray-300 transition"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}