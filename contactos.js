let contactos = [];
//aqui agregamos un contacto con un id único
const agregarContacto = (nombre, tel, correo) => {
  const nuevoContacto = {
    id: Date.now(),
    nombre,
    tel,
    correo
  };
  contactos = [...contactos, nuevoContacto];
  console.log(`Contacto agregado: ${nombre}`);
  return nuevoContacto;
};
//este es para eliminarlo
const eliminarContacto = (id) => {
  const encontrado = contactos.find(c => c.id === id);
  if (!encontrado) return console.log("Contacto no encontrado.");
  contactos = contactos.filter(c => c.id !== id);
  console.log(`Contacto eliminado: ${encontrado.nombre}`);
};
//para buscarlo
const buscarContacto = (termino) => {
  const t = termino.toLowerCase();
  return contactos.filter(
    ({ nombre, correo }) =>
      nombre.toLowerCase().includes(t) || correo.toLowerCase().includes(t)
  );
};
//y actualizarlo
const actualizarContacto = (id, datos) => {
  contactos = contactos.map(c =>
    c.id === id ? { ...c, ...datos } : c
  );
  console.log(`Contacto #${id} actualizado.`);
};

const exportarJSON = (contactos) => JSON.stringify(contactos, null, 2);

console.log("\n===== EJERCICIO 3: Contactos =====");

const c1 = agregarContacto("Carolina Gómez",  "3001234567", "caro@sena.edu.co");
const _c2 = agregarContacto("Gustavo Bolaños", "3109876543", "gabo@sena.edu.co");
const c3 = agregarContacto("Matías López",    "3207654321", "mati@sena.edu.co");

console.log("Contactos:",          contactos);
console.log("Buscar 'gabo':",      buscarContacto("gabo"));

actualizarContacto(c1.id, { tel: "3011111111" });
console.log("Tras actualizar c1:", contactos.find(c => c.id === c1.id));

eliminarContacto(c3.id);
console.log("Tras eliminar c3:",   contactos);

console.log("JSON exportado:\n",   exportarJSON(contactos));