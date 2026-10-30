//profe cambie los comandos por si acaso, por que me tiraba error con ts-node-dev y
//use tsx en su lugar por que lei que era compatible con node 20+ tmb el package.json
//tambien tube que instalar con pnpm tsc --init por que con npx me daba error

import express from 'express';
import cors from 'cors';
import estudiantesRouter from './routes/estudiantes';
import studentsRouter from './routes/students';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../swagger_output.json';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json()); 

// Endpoint raíz requerido por el frontend de prueba de Netlify
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor en línea' });
});

app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/students', studentsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));


// la ia me dijo que esto va mejor abajo por buenas practicas (yo lo puse arriba)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ala gran estaba mas dificil la tarea de la tarde hahaha      ╱|、
// esta segunda si me costo un poquito mas XD                  (˚ˎ 。7  
//                                                              |、˜〵          
//psdt siempre hago mi tarea con un .md al lado explicandome    じしˍ,)ノ
//espero no sea molestia  
//ya mi cabeza no aguanta mucha informaciooon                                                           
