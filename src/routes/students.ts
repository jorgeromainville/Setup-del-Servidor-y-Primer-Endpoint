import { Router, type Request, type Response } from 'express';
import { estudiantes, type Estudiante } from './estudiantes';

const router = Router();

// GET /api/students (adaptador para interfaz Netlify)
router.get('/', (req: Request, res: Response) => {
  const { bootcamp } = req.query;
  let filtrados = estudiantes;

  if (bootcamp) {
    filtrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === String(bootcamp).toLowerCase()
    );
  }

  // Netlify espera un arreglo directo con propiedades: id, name, email, bootcamp
  const responseData = filtrados.map((e) => ({
    id: e.id,
    name: e.nombre,
    email: e.email,
    bootcamp: e.bootcamp,
  }));

  res.status(200).json(responseData);
});

// POST /api/students
router.post('/', (req: Request, res: Response) => {
  const { name, email, bootcamp, nombre } = req.body;
  const studentName = name || nombre;

  if (!studentName || !email || !bootcamp) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const nextId = estudiantes.length > 0 ? Math.max(...estudiantes.map((e) => e.id)) + 1 : 1;
  const nuevo: Estudiante = {
    id: nextId,
    nombre: studentName,
    email,
    bootcamp,
  };

  estudiantes.push(nuevo);

  res.status(201).json({
    id: nuevo.id,
    name: nuevo.nombre,
    email: nuevo.email,
    bootcamp: nuevo.bootcamp,
  });
});

// PUT /api/students/:id
router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, bootcamp, nombre } = req.body;
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Estudiante no encontrado' });
  }

  if (name || nombre) estudiantes[index].nombre = name || nombre;
  if (email) estudiantes[index].email = email;
  if (bootcamp) estudiantes[index].bootcamp = bootcamp;

  res.status(200).json({
    id: estudiantes[index].id,
    name: estudiantes[index].nombre,
    email: estudiantes[index].email,
    bootcamp: estudiantes[index].bootcamp,
  });
});

// DELETE /api/students/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Estudiante no encontrado' });
  }

  estudiantes.splice(index, 1);
  res.status(200).json({ message: 'Estudiante eliminado' });
});

export default router;

