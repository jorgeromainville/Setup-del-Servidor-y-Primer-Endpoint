//profe cambie los comandos por si acaso, por que me tiraba error con ts-node-dev y
//use tsx en su lugar por que lei que era compatible con node 20+ tmb el package.json
//tambien tube que instalar con pnpm tsc --init por que con npx me daba error

import express from 'express';

const app = express();
const PORT = 3000;

//1er endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: "el servidor esta ready", version: "1.0.0" });
});

//yo puse "scripts": {
// "dev": "tsx watch src/index.ts"} y sirve igual


// la ia me dijo que esto va mejor abajo por buenas practicas (yo lo puse arriba)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ala gran estaba mas dificil la tarea de la tarde hahaha      ╱|、
//                                                             (˚ˎ 。7  
//                                                              |、˜〵          
//                                                              じしˍ,)ノ


