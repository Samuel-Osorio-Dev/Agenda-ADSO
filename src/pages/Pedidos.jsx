import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { listarPedidos, crearPedido, actualizarPedido, eliminarPedidoPorId } from "../api";
import { APP_INFO } from "../config";
import FormularioPedido from "../components/FormularioPedido";
import PedidoCard from "../components/PedidoCard";

export default function Pedidos() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [pedidoEnEdicion, setPedidoEnEdicion] = useState(null);
  const [vista, setVista] = useState("crear");

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        setError("");
        const data = await listarPedidos();
        setPedidos(data);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los pedidos. Verifica tu conexión.");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  const agregarPedido = async (nuevo) => {
    try {
      setError("");
      const creado = await crearPedido(nuevo);
      setPedidos((prev) => [...prev, creado]);
    } catch (e) {
      console.error(e);
      setError("No se pudo guardar el pedido.");
      throw e;
    }
  };

  const onActualizarPedido = async (pedidoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarPedido(pedidoActualizado.id, pedidoActualizado);
      setPedidos((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );
      setPedidoEnEdicion(null);
      setVista("pedidos");
    } catch (e) {
      console.error(e);
      setError("No se pudo actualizar el pedido.");
      throw e;
    }
  };

  const eliminarPedido = async (id) => {
    try {
      setError("");
      await eliminarPedidoPorId(id);
      setPedidos((prev) => prev.filter((p) => p.id !== id));
      setPedidoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (e) {
      console.error(e);
      setError("No se pudo eliminar el pedido.");
    }
  };

  const pedidosFiltrados = pedidos
    .filter((p) => filtroEstado === "todos" || (p.estado || "") === filtroEstado)
    .filter((p) => {
      const t = busqueda.toLowerCase();
      return (
        (p.cliente || "").toLowerCase().includes(t) ||
        (p.direccion || "").toLowerCase().includes(t) ||
        (p.pedido || "").toLowerCase().includes(t) ||
        (p.telefono || "").toLowerCase().includes(t)
      );
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Proyecto Final
              </p>
              <h1 className="text-sm md:text-base font-semibold text-slate-50">
                {APP_INFO.titulo}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Dashboard
            </button>

            <button
              onClick={logout}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-14">
        <div className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start">
          <div className="bg-white/95 rounded-3xl shadow-2xl px-6 py-7 md:px-8 md:py-8">
            <header className="mb-5 flex justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  {APP_INFO.titulo}
                </h2>
                <p className="text-sm text-gray-600">
                  {APP_INFO.subtitulo}
                </p>
              </div>

              <button
                onClick={() =>
                  setVista(vista === "crear" ? "pedidos" : "crear")
                }
                className="text-sm px-4 py-2 border rounded-xl"
              >
                {vista === "crear" ? "Ver pedidos" : "Nuevo pedido"}
              </button>
            </header>

            {error && (
              <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
            )}

            {cargando ? (
              <p>Cargando pedidos...</p>
            ) : (
              <>
                {vista === "crear" && (
                  <FormularioPedido
                    onAgregar={agregarPedido}
                    onActualizar={onActualizarPedido}
                    pedidoEnEdicion={pedidoEnEdicion}
                    onCancelarEdicion={() => setPedidoEnEdicion(null)}
                  />
                )}

                {vista === "pedidos" && (
                  <>
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="mb-3 w-full border p-2 rounded"
                    />

                    {/* 🔥 FILTRO POR ESTADO (ARREGLA EL WARNING) */}
                    <select
                      value={filtroEstado}
                      onChange={(e) => setFiltroEstado(e.target.value)}
                      className="mb-3 w-full border p-2 rounded"
                    >
                      <option value="todos">Todos</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>

                    {pedidosFiltrados.length === 0 ? (
                      <p>No hay pedidos</p>
                    ) : (
                      pedidosFiltrados.map((p) => (
                        <PedidoCard
                          key={p.id}
                          cliente={p.cliente}
                          telefono={p.telefono}
                          direccion={p.direccion}
                          pedido={p.pedido}
                          estado={p.estado}
                          onEliminar={() => eliminarPedido(p.id)}
                          onEditar={() => {
                            setPedidoEnEdicion(p);
                            setVista("crear");
                          }}
                        />
                      ))
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}