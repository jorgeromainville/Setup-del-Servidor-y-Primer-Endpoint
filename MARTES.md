# Martes — CRUD en Memoria y Middlewares HTTP

## Temas aplicados

`express.json()` · Verbos HTTP (`POST`, `PUT`, `DELETE`) · Códigos de estado

**Tiempo estimado:** 2 horas

---

## Entregables

### 1. Hito Git — Nueva rama

```bash
git checkout -b feature/crud-memoria
```

### 2. Middleware global

Configura el middleware `express.json()` en `src/index.ts` para que el servidor pueda leer el body de las peticiones POST y PUT. Agrégalo antes de definir cualquier ruta:

```ts
app.use(express.json());
```

### 3. Interface `Estudiante` y arreglo en memoria

Declara una interface de TypeScript y un arreglo vacío para almacenar los datos:

```ts
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
```

### 4. Cuatro endpoints CRUD

Implementa los siguientes endpoints directamente en `src/index.ts`:

- **`GET /api/estudiantes`** — Retorna la lista completa de estudiantes.
- **`POST /api/estudiantes`** — Recibe los datos en el body, genera un ID automático, guarda el estudiante en el arreglo y lo retorna con código **`201 Created`**. Si el campo `email` no está presente en el body, responde con código **`400 Bad Request`**.
- **`PUT /api/estudiantes/:id`** — Busca al estudiante por su ID en `req.params` y actualiza sus datos. Si el ID no existe, responde con código **`404 Not Found`**.
- **`DELETE /api/estudiantes/:id`** — Elimina al estudiante del arreglo.

### 5. Probar con Thunder Client o Postman

Antes de hacer el commit, verifica cada endpoint:

| Petición | URL | Body esperado |
| --- | --- | --- |
| GET | `/api/estudiantes` | — |
| POST | `/api/estudiantes` | `{ "nombre": "...", "email": "...", "bootcamp": "..." }` |
| PUT | `/api/estudiantes/1` | `{ "nombre": "...", "email": "...", "bootcamp": "..." }` |
| DELETE | `/api/estudiantes/1` | — |

Prueba también el caso de error: hace un POST sin `email` y confirma que recibes `400`.

---

## Hito Git

```bash
git add .
git commit -m "feat: CRUD de estudiantes en memoria"
git push origin feature/crud-memoria
```

Entra a GitHub y abre un **Pull Request** de `feature/crud-memoria` hacia `main`. Revisa el diff, aprueba y ejecuta el merge. Luego sincroniza `main` en local:

```bash
git checkout main
git pull
```
