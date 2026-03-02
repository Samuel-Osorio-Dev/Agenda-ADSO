//aqui voy a generar el stock de una tienda de accesorios tecnologicos
const productos = [
  { nombre: "Laptop",  precio: 1200000, stock: 5  },
  { nombre: "Mouse",   precio: 35000,   stock: 0  },
  { nombre: "Teclado", precio: 85000,   stock: 12 }
];
// el nombre de las const explica lo que hace cada uno 
const obtenerDisponibles = (productos) =>
  productos.filter(({ stock }) => stock > 0);

const calcularInventario = (productos) =>
  productos.reduce((total, { precio, stock }) => total + precio * stock, 0);

const aplicarDescuento = (productos, porcentaje) =>
  productos.map(p => ({
    ...p,
    precio: Math.round(p.precio * (1 - porcentaje / 100))
  }));

const ordenarPorPrecio = (productos) =>
  [...productos].sort((a, b) => a.precio - b.precio);

console.log("\n===== EJERCICIO 2: Productos =====");
console.log("Disponibles:",    obtenerDisponibles(productos));
console.log("Inventario $:",   calcularInventario(productos));
console.log("Descuento 10%:",  aplicarDescuento(productos, 10));
console.log("Por precio:",     ordenarPorPrecio(productos));