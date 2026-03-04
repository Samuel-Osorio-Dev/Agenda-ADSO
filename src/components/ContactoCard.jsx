export default function ContactoCard({ contacto, onEliminar }) {
  const { nombre, telefono, correo, etiqueta, empresa } = contacto;

  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-morado-oscuro">{nombre}</h3>

          {empresa && (
            <p className="text-sm text-gray-600 mb-1">🏢 {empresa}</p>
          )}

          <p className="text-sm text-gray-600">📞 {telefono}</p>
          <p className="text-sm text-gray-600">✉️ {correo}</p>

          <div className="flex gap-1 flex-wrap mt-2">
            {etiqueta && (
              <span className="bg-morado text-white text-xs rounded px-2 py-1">
                {etiqueta}
              </span>
            )}
            <span className="bg-morado text-white text-xs rounded px-2 py-1">
              ADSO
            </span>
          </div>
        </div>

        <button
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}