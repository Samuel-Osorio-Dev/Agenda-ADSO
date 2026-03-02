const aprendices = [
  { id: 1, nombre: "Ana",   ficha: 3223874, nota: 4.2 },
  { id: 2, nombre: "Luis",  ficha: 3223874, nota: 3.5 },
  { id: 3, nombre: "María", ficha: 3223875, nota: 4.8 }
];

const obtenerAprobados = (aprendices) =>
  aprendices.filter(({ nota }) => nota >= 3.0);

const calcularPromedio = (aprendices) => {
  const total = aprendices.reduce((sum, { nota }) => sum + nota, 0);
  return (total / aprendices.length).toFixed(2);
};

const buscarPorNombre = (aprendices, nombre) =>
  aprendices.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());

const obtenerNombres = (aprendices) =>
  aprendices.map(({ nombre }) => nombre);
//aqui agrupo los estudiantes aprobados, promedio por gruoo, busqueda de aprendiz y sus nombres
console.log("===== EJERCICIO 1: Aprendices =====");
console.log("Aprobados:",      obtenerAprobados(aprendices));
console.log("Promedio grupo:", calcularPromedio(aprendices));
console.log("Buscar 'Ana':",   buscarPorNombre(aprendices, "Ana"));
console.log("Nombres:",        obtenerNombres(aprendices));