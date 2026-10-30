import { Router, type Request, type Response } from 'express';

const router = Router();

export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

export const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Juan",
    email: "juan@mail.com",
    bootcamp: "Full Stack",
  },
  {
    id: 2,
    nombre: "Maria",
    email: "maria@mainModule.com ",
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
//traer todos los estudiantes
router.get('/', function (req: Request, res: Response) {
   /* 
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'Traer todos los estudiantes'
      #swagger.description = 'Endpoint para obtener todos los estudiantes registrados  }]
    */

  
  const { bootcamp } = req.query;

  // filtrar ?bootcamp=
  if (bootcamp) {
    const filtrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === String(bootcamp).toLowerCase()
    );
    return res.status(200).json({
      ok: true,
      mensaje: `lista de estudiantes de ${bootcamp}`,
      total: filtrados.length,
      data: filtrados,
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "lista de estudiantes",
    total: estudiantes.length,
    data: estudiantes,
  });
});

//buscar por ID
router.get('/:id', function (req: Request, res: Response) {
  /* 
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'Traer un estudiante'
      #swagger.description = 'Endpoint para obtener un estudiante por su ID'
      #swagger.parameters['id'] = {
      description: 'ID del estudiante',
      type: 'string',
      required: true,
      example: '12438'}   
      }]
    */
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({
      ok: false,
      mensaje: "estudiante no encontrado",
    });
  }

  res.status(200).json({
    ok: true,
    data: estudiante,
  });
});

//crear un estudiante
router.post('/', function (req: Request, res: Response) {
  /* 
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'Crear un Estudiante'
      #swagger.description = 'Endpoint para crear un Estudiante por su ID'
      #swagger.parameters['id'] = {
        description: 'ID del Estudiante',
        type: 'number',
        required: true,
        example: 1
      }
      #swagger.parameters['EstudianteCreado'] = {
        in: 'body',
        description: 'Campos del Estudiante a crear (ejemplo)',
        required: true,
        schema: {
          nombre: "string",
          email: "string",
          bootcamp: "string",
        }
      }
    */
  const { nombre, email, bootcamp } = req.body;
  if (!nombre || !email || !bootcamp || email && nombre && bootcamp !== "string") {
    return res.status(400).json({
      ok: false,
      mensaje: "faltan campos obligatorios o tipado incorrecto",
    });
  } 
  let nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
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

//actualizar un estudiante
router.put('/:id', function (req: Request, res: Response) {run 
   /* 
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'Actualizar un Estudiante'
      #swagger.description = 'Endpoint para actualizar un estudiante por su ID'
    */
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

//eliminar estdiante
router.delete('/:id', function (req: Request, res: Response) {
      /* 
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'eliminar un Estudiante'
      #swagger.description = 'Endpoint para eliminar un Estudiante por su ID'
    */
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

export default router;
