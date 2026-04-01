import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { listarPedidos } from "../api";
import { APP_INFO } from "../config";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      try {
        const data = await listarPedidos();
        setPedidos(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  const pendientes = pedidos.filter((p) => p.estado === "pendiente").length;
  const entregados = pedidos.filter((p) => p.estado === "entregado").length;
  const cancelados = pedidos.filter((p) => p.estado === "cancelado").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Proyecto Final</p>
              <h1 className="text-sm md:text-base font-semibold text-slate-50">{APP_INFO.titulo}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">SENA CTMA</p>
              <p className="text-xs text-slate-200">Ficha {APP_INFO.ficha}</p>
            </div>
            <button onClick={logout} className="text-xs px-3 py-1.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-extrabold text-white mb-2">Dashboard</h2>
        <p className="text-slate-400 text-sm mb-8">{APP_INFO.subtitulo}</p>

        {cargando ? (
          <p className="text-slate-400 text-sm">Cargando...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total pedidos", valor: pedidos.length, color: "bg-purple-600" },
                { label: "Pendientes", valor: pendientes, color: "bg-yellow-500" },
                { label: "Entregados", valor: entregados, color: "bg-green-500" },
                { label: "Cancelados", valor: cancelados, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label} className="bg-white/95 rounded-2xl p-5 shadow border border-slate-100 flex flex-col gap-1">
                  <span className={`h-2 w-8 rounded-full ${item.color} mb-2`} />
                  <span className="text-3xl font-extrabold text-gray-900">{item.valor}</span>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/pedidos")}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition text-sm"
              >
                Ver y gestionar pedidos
              </button>
              <button
                onClick={() => navigate("/acerca")}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-2xl transition text-sm border border-slate-700"
              >
                Acerca de la app
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}