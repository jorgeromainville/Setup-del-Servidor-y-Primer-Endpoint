//profe cambie los comandos por si acaso, por que me tiraba error con ts-node-dev y
//use tsx en su lugar por que lei que era compatible con node 20+ tmb el package.json
//tambien tube que instalar con pnpm tsc --init por que con npx me daba error

import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;
app.use(express.json()); //Middleware global

//yo puse "scripts": {
// "dev": "tsx watch src/index.ts"} y sirve igual

//interface estudiante
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

//array de estudiantes (db falsa)
const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Juan",
    email: "juan@mail.com",
    bootcamp: "Full Stack",
  },
  {
    id: 2,
    nombre: "Maria",
    email: "maria@mainModule.com "     ,
    bootcamp: "Full Stack",
  },
  {
    id: 3,
    nombre: "Pedro",
    email: "pedro@mail.com",
    bootcamp: "Frontend",
  },
  {
    id: 4,
    nombre: "Ana",
    email: "ana@mail.com",
    bootcamp: "Backend",
  },
  {
    id: 5,
    nombre: "Luis",
    email: "luis@mail.com",
    bootcamp: "Full Stack",
  },
];


//1er endpoint
/*app.get('/api/status', (req, res) => {
  res.json({ status: "el servidor esta ready", version: "1.0.0" });
});*/

// get (lista de estudiantes)
app.get('/api/estudiantes', function (req: Request, res: Response) {
    res.status(200).json({
        ok: true,
        mensaje: "lista de estudiantes",
        total: estudiantes.length,
        data: estudiantes,
    });
});

//post (agregar estudiante)
app.post("/api/estudiantes", function (req: Request, res: Response) {
  const { nombre, email, bootcamp } = req.body;
  if (!nombre || !email || !bootcamp || email && nombre && bootcamp !== "string") { //aprovechando puse tambien a los otros datos no solo email
    return res.status(400).json({
      ok: false,
      mensaje: "faltan campos obligatorios o tipado incorrecto",
    });
  } 
  let nuevoEstudiante: Estudiante = {
    id: estudiantes.length +1,
    nombre,
    email,
    bootcamp,
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: "estudiante registrado con exito",
    data: nuevoEstudiante,
  });
});

//put (actualizar estudiante)
app.put('/api/estudiantes/:id', function (req: Request, res: Response) {
    const id = Number(req.params.id);
    const estudianteActualizado = req.body;
    const index = estudiantes.findIndex((e) => e.id === id);
    if (index === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: "estudiante no encontrado",
        });
    }
    estudiantes[index] = { ...estudiantes[index], ...estudianteActualizado };
    res.status(200).json({
        ok: true,
        mensaje: "estudiante actualizado",
        data: estudiantes[index],
    });
});

//delete (eliminar estudiante)
app.delete('/api/estudiantes/:id', function (req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = estudiantes.findIndex((e) => e.id === id);
    if (index === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: "estudiante no encontrado",
        });
    }
    estudiantes.splice(index, 1);
    res.status(200).json({
        ok: true,
        mensaje: "estudiante eliminado",
    });
});

//=================NOTAS
//todos pasaron bien y cuando quito el email en post sale error 400
//peroo si pongo un numero como email no sale error y lo acepta
//ahora ya esta quedo, tambien aproche y lo puse para nombre y bootcamp por si acaso


// la ia me dijo que esto va mejor abajo por buenas practicas (yo lo puse arriba)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ala gran estaba mas dificil la tarea de la tarde hahaha      ╱|、
// esta segunda si me costo un poquito mas XD                  (˚ˎ 。7  
//                                                              |、˜〵          
//psdt siempre hago mi tarea con un .md al lado explicandome    じしˍ,)ノ
//espero no sea molestia                                                             


