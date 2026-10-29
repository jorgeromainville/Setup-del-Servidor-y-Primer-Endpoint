# Miércoles — Enrutamiento Dinámico y Refactorización

## Temas aplicados

`express.Router` · Parámetros de ruta (`req.params`) · Query Strings (`req.query`)

**Tiempo estimado:** 2 horas

---

## Entregables

### 1. Hito Git — Nueva rama desde `main`

Asegúrate de estar en `main` (ya actualizado del martes) y crea una nueva rama:

```bash
git checkout main
git checkout -b feature/enrutamiento
```

### 2. Refactorización — Extraer las rutas

Crea la carpeta `src/routes` y dentro de ella el archivo `src/routes/estudiantes.ts`. Mueve **todas las rutas** creadas el martes a este archivo usando `express.Router()`:

```ts
import { Router } from 'express';

const router = Router();

// las rutas van aquí

export default router;
```

En `src/index.ts`, importa el router y monta todas las rutas bajo el prefijo `/api/estudiantes`:

```ts
import estudiantesRouter from './routes/estudiantes';

app.use('/api/estudiantes', estudiantesRouter);
```

> Dentro del router, las rutas ya no necesitan el prefijo `/api/estudiantes` — solo la parte final: `/`, `/:id`, etc.

### 3. Filtrado por query string

Actualiza el endpoint `GET /` del router para que soporte el parámetro `bootcamp` en la query string. El comportamiento esperado:

- `GET /api/estudiantes` → devuelve todos los estudiantes
- `GET /api/estudiantes?bootcamp=Frontend` → devuelve solo los inscritos en ese bootcamp

Usa `req.query.bootcamp` para leer el parámetro y aplica `.filter()` sobre el arreglo si el parámetro está presente.

### 4. Obtener un estudiante por ID

Crea el endpoint `GET /:id` que reciba el ID por `req.params.id` y devuelva el objeto de ese estudiante. Si no existe, responde con código **`404 Not Found`**.

---

## Hito Git

```bash
git add .
git commit -m "feat: router independiente y filtrado por query string"
git push origin feature/enrutamiento
```

Abre un Pull Request de `feature/enrutamiento` hacia `main`. Revisa, aprueba y ejecuta el merge. Sincroniza `main`:

```bash
git checkout main
git pull
```

