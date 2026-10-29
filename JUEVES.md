# Jueves — Documentación Profesional con Swagger

## Temas aplicados

OpenAPI · `swagger-autogen` · `swagger-ui-express`

**Tiempo estimado:** 2 horas

---

## Entregables

### 1. Hito Git — Nueva rama desde `main`

```bash
git checkout main
git checkout -b feature/documentacion
```

### 2. Instalar dependencias

```bash
pnpm add swagger-ui-express
pnpm add -D swagger-autogen @types/swagger-ui-express
```

### 3. Script generador de documentación

Crea el archivo `src/swagger.ts`. Este script se ejecutará manualmente para generar el archivo `swagger_output.json` a partir de tus rutas:

```ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API de Inscripciones Académicas',
    description: 'Documentación de la API REST del MP-S2',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger_output.json';
const routes = ['./src/index.ts'];

swaggerAutogen()(outputFile, routes, doc);
```

Agrega un script en `package.json` para ejecutarlo fácilmente:

```json
"scripts": {
  "swagger": "ts-node src/swagger.ts"
}
```

Ejecuta el generador y confirma que se creó `swagger_output.json` en la raíz del proyecto:

```bash
pnpm swagger
```

### 4. Servir la interfaz de Swagger

En `src/index.ts`, importa el JSON generado y configura la ruta `/api-docs`:

```ts
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../swagger_output.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
```

### 5. Comentarios descriptivos en las rutas

Agrega comentarios de swagger-autogen en cada endpoint del router para describir su propósito. Por ejemplo:

```ts
router.get('/', (req, res) => {
  // #swagger.description = 'Obtiene la lista de estudiantes'
  ...
});

router.post('/', (req, res) => {
  // #swagger.description = 'Crea un nuevo estudiante'
  ...
});
```

Vuelve a ejecutar `pnpm swagger` después de agregar los comentarios para regenerar el JSON.

### 6. Probar desde Swagger

Abre `http://localhost:3000/api-docs` en el navegador. Prueba **absolutamente todos los endpoints** (GET, POST, PUT, DELETE) directamente desde la interfaz de Swagger, sin usar Thunder Client ni Postman.

---

## Hito Git

```bash
git add .
git commit -m "feat: documentación con Swagger"
git push origin feature/documentacion
```

Abre un Pull Request de `feature/documentacion` hacia `main`. Revisa, aprueba y ejecuta el merge. Sincroniza `main`:

```bash
git checkout main
git pull
```

