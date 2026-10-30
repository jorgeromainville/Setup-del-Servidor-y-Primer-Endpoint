# Viernes — Variables de Entorno, CORS y Prueba Final

## Temas aplicados

Variables de entorno · Soporte nativo `.env` de Node · Middleware CORS · Port Forwarding en VS Code

**Tiempo estimado:** 2 horas

---

## Entregables

### 1. Archivo `.env`

Crea el archivo `.env` en la raíz del proyecto y define la variable de puerto:

```env
PORT=3000
```

Agrega `.env` a tu `.gitignore` para no subir variables de entorno al repositorio:

```gitignore
node_modules
.env
```

### 2. Leer el puerto desde la variable de entorno

Instala `tsx`, el ejecutor que soporta el flag nativo `--env-file` de Node:

```bash
pnpm add -D tsx
```

Actualiza el script `dev` en `package.json`:

```json
"scripts": {
  "dev": "tsx --env-file=.env --watch src/index.ts"
}
```

En `src/index.ts`, cambia el puerto fijo por la variable de entorno:

```ts
const PORT = process.env.PORT ?? 3000;
```

Reinicia el servidor con `pnpm dev` y verifica que sigue corriendo en el puerto esperado.

### 3. La prueba de fuego: CORS

Abre la siguiente URL en el navegador:
[https://test-your-mp2.netlify.app/](https://test-your-mp2.netlify.app/)

Esta es una interfaz gráfica ya desplegada. Cuando intentes registrar un estudiante apuntando a tu servidor local verás un error de CORS en la consola del navegador — el navegador bloquea las peticiones entre orígenes distintos (`netlify.app` → `localhost`) por seguridad.

### 4. Solución CORS

Instala el middleware de CORS:

```bash
pnpm add cors
pnpm add -D @types/cors
```

Aplícalo globalmente en `src/index.ts` antes de cualquier ruta:

```ts
import cors from 'cors';

app.use(cors());
```

### 5. Port Forwarding en VS Code

Para que la interfaz en Netlify pueda comunicarse con tu servidor, necesitas hacer público tu puerto local. VS Code tiene esta funcionalidad integrada:

1. Abre la pestaña **Ports** en el panel inferior de VS Code (junto a Terminal).
2. Haz clic en **Forward a Port** e ingresa `3000`.
3. VS Code te generará una URL pública — cópiala.

*El video en la página principal de este mini-proyecto explica paso a paso cómo hacer el port forwarding y cómo usarlo con la interfaz.*

### 6. Conectar con la interfaz

Con el servidor corriendo y el puerto publicado:

1. Abre [https://test-your-mp2.netlify.app/](https://test-your-mp2.netlify.app/)
2. Pega tu URL pública de Port Forwarding donde la interfaz te lo indique.
3. Registra un estudiante y verifica que aparece en la lista.

¡Ahora tienes un sistema Full-Stack funcional!

---

## Hito Git

```bash
git add .
git commit -m "feat: variables de entorno y configuración de CORS"
```

---

## Reto Extra

Tu API guarda los datos en memoria — al reiniciar el servidor, todos los estudiantes desaparecen.

Usando el módulo nativo `fs/promises` de Node.js, modifica tu backend para que los datos persistan en un archivo `database.json`:

- Cada vez que hagas un `POST`, `PUT` o `DELETE`, sobrescribe el archivo con el estado actual del arreglo.
- Cada vez que el servidor inicie, lee el archivo para poblar el arreglo en memoria.

Esto simula el comportamiento de una base de datos antes de conectar una real.

```bash
git commit -m "feat: persistencia de datos con fs/promises"
```

