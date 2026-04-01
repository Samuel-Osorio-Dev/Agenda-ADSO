import { useNavigate } from "react-router-dom";
import { APP_INFO } from "../config";
import { useAuth } from "../context/AuthContext";

export default function Acerca() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
            <button onClick={() => navigate("/")} className="text-xs px-3 py-1.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors">
              Dashboard
            </button>
            <button onClick={logout} className="text-xs px-3 py-1.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-slate-100 px-8 py-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              A
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{APP_INFO.titulo}</h2>
              <p className="text-sm text-gray-500">{APP_INFO.subtitulo}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Vite", "Tailwind CSS", "React Router", "Context API", "JSON Server", "Render"].map((tech) => (
                  <span key={tech} className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full border border-purple-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Funcionalidades</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Autenticación con Context API y localStorage</li>
                <li>✓ Rutas protegidas con React Router</li>
                <li>✓ CRUD completo de pedidos a domicilio</li>
                <li>✓ Búsqueda y filtrado por estado</li>
                <li>✓ API REST desplegada en Render</li>
                <li>✓ Diseño responsive</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Información académica</h3>
              <p className="text-sm text-gray-600">Programa: Análisis y Desarrollo de Software – ADSO</p>
              <p className="text-sm text-gray-600">Institución: SENA CTMA – Regional Antioquia</p>
              <p className="text-sm text-gray-600">Ficha: {APP_INFO.ficha}</p>
              <p className="text-sm text-gray-600">Instructor: Gustavo Bolaños</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/pedidos")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            Ir a gestionar pedidos
          </button>
        </div>
      </main>
    </div>
  );
}