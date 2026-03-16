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

# Agenda ADSO v9 | SENA CTMA
## Proyecto ABP – Desarrollo Web con ReactJS

Aplicación de gestión de contactos desarrollada con React + Vite + Tailwind CSS, conectada a una API local con JSON Server. Proyecto integrador del programa ADSO – SENA CTMA.

---

## Tecnologías usadas

- React 18 + Vite
- Tailwind CSS
- JSON Server (API REST local)
- JavaScript ES6+
- Git + GitHub

---

## Funcionalidades implementadas

- [x] Crear contactos con validaciones de formulario
- [x] Listar contactos desde la API (JSON Server)
- [x] Editar contactos existentes (PUT)
- [x] Eliminar contactos (DELETE)
- [x] Búsqueda en tiempo real por nombre, correo, etiqueta y teléfono
- [x] Ordenamiento alfabético A-Z / Z-A
- [x] Mensajes de error amigables al usuario
- [x] Configuración centralizada en `config.js`

---

## Estructura del proyecto
```
semana3/  // todo a partir de la semana 3 ha sido modificado en esta misma carpeta, sin embargo en todas las evidencias he modificado lo solicitado  y así mismo lo he ido documentando en cada trabajo

  src/
    components/
      FormularioContacto.jsx
      ContactoCard.jsx
    App.jsx
    api.js
    config.js
    index.css
  db.json
  vite.config.js
  tailwind.config.js
```

---

## Instalación y uso
```bash
# Instalar dependencias
npm install

# Iniciar JSON Server (puerto 3002)
json-server db.json --port 3002

# Iniciar la app React (puerto 5174)
npm run dev
```

---

## Historial de versiones

| Versión | Clase | Descripción |
|---------|-------|-------------|
| v1-v3 | 1-5 | Fundamentos React, componentes, props, estados |
| v4 | 6 | Estilos con Tailwind CSS |
| v5 | 7 | Conexión a API REST con JSON Server |
| v6 | 8 | Validaciones y UX mejorada |
| v7 | 9 | Refactorización y config.js |
| v8 | 10 | Búsqueda y ordenamiento |
| v9 | 11 | Edición de contactos – CRUD completo |

---

## Aprendizajes clave

- `useState` y `useEffect` para manejar estados y efectos en React
- Consumo de API REST con `fetch` (GET, POST, PUT, DELETE)
- Validaciones de formulario con mensajes de error contextuales
- Inmutabilidad del estado con spread operator
- Separación de responsabilidades: UI, API y configuración

---

## Instructor
Gustavo Adolfo Bolaños Dorado – SENA CTMA  
Programa: Análisis y Desarrollo de Software (ADSO)  
Ficha: 3223876
