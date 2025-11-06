// server/routes/uaRoutes.js
const express = require('express');
const router = express.Router();

// Importa modelos desde tu modelo.js
const { Unidad_Aprendizaje, Carrera } = require('../model/modelo');

// GET: todas las UAs
router.get('/', async (req, res) => {
  try {
    const list = await Unidad_Aprendizaje.findAll();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET: una UA por id (PK string)
router.get('/:id', async (req, res) => {
  try {
    const item = await Unidad_Aprendizaje.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST: crear UA
router.post('/', async (req, res) => {
  try {
    const { id, nombre, credito, carrera, semestre } = req.body;

    if (!id || !nombre || credito == null || !carrera || semestre == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validación: que la carrera exista
    const existsCarrera = await Carrera.findByPk(carrera);
    if (!existsCarrera) {
      return res.status(400).json({ error: `La carrera '${carrera}' no existe` });
    }

    const created = await Unidad_Aprendizaje.create({
      id, // PK string (coincide con tu modelo)
      nombre,
      credito: Number(credito),
      carrera,
      semestre: Number(semestre),
    });

    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT: actualizar UA por id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, credito, carrera, semestre } = req.body;

    if (carrera != null) {
      const existsCarrera = await Carrera.findByPk(carrera);
      if (!existsCarrera) {
        return res.status(400).json({ error: `La carrera '${carrera}' no existe` });
      }
    }

    const [rows] = await Unidad_Aprendizaje.update(
      {
        ...(nombre != null && { nombre }),
        ...(credito != null && { credito: Number(credito) }),
        ...(carrera != null && { carrera }),
        ...(semestre != null && { semestre: Number(semestre) }),
      },
      { where: { id: req.params.id } }
    );

    if (!rows) return res.status(404).json({ error: 'No encontrado' });

    const refreshed = await Unidad_Aprendizaje.findByPk(req.params.id);
    res.json(refreshed);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE: eliminar UA por id
router.delete('/:id', async (req, res) => {
  try {
    const rows = await Unidad_Aprendizaje.destroy({ where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ error: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
