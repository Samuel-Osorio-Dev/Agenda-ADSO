# Semana 2: JavaScript ES6+
## Proyecto Agenda ADSO | SENA CTMA

## Objetivos alcanzados
- [x] Variables let y const
- [x] Arrow functions
- [x] Destructuring y spread
- [x] Métodos de arreglos
- [x] Template literals
## Ejercicios completados
1. Gestión de aprendices (ejercicios.js)
2. Lista de tareas (lista-tareas.js)
3. Sistema de contactos (contactos.js)

## Ejercicios completados
1. Gestión de aprendices (ejercicios.js)
Tengo una lista de 3 estudiantes con su nota. Creo 4 funciones: una filtra los que pasaron (nota >= 3.0), otra calcula el promedio del grupo, otra busca un estudiante por nombre, y la última devuelve solo los nombres.

2. Lista de tareas (lista-tareas.js)
Tengo una tienda con 3 productos tecnológicos. Creo 4 funciones: una filtra los que tienen stock disponible, otra calcula el valor total del inventario multiplicando precio por stock, otra aplica un descuento en porcentaje a todos los precios, y la última los ordena de menor a mayor precio.

3. Sistema de contactos (contactos.js)
Manejo una agenda de contactos vacía al inicio. Creo 5 funciones: una agrega un contacto con ID único, otra lo elimina por ID, otra lo busca por nombre o correo, otra actualiza sus datos, y la última convierte toda la agenda a formato JSON para exportarla.


## Aprendizajes clave
- `filter`, `map` y `reduce` permiten manipular listas sin modificar el original
- El spread operator (`...`) es útil para copiar y actualizar objetos sin mutarlos
- El destructuring hace el código más limpio al extraer solo lo que necesito
- Las arrow functions simplifican la escritura de funciones pequeñas

## Dificultades superadas
- `Date.now()` genera IDs duplicados si se ejecuta muy rápido; se resolvió usando un contador incremental
- Una variable declarada pero no usada genera advertencia en ESLint; se resolvió con el prefijo `_`
