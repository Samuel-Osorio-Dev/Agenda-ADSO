import { API_BASE_URL } from "./config";

export async function listarPedidos() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Error al listar pedidos");
  return res.json();
}

export async function crearPedido(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el pedido");
  return res.json();
}

export async function actualizarPedido(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el pedido");
  return res.json();
}

export async function eliminarPedidoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el pedido");
  return true;
}