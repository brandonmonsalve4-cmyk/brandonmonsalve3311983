import { Router } from 'express';
import { pool } from '../db.js'; 
const router = Router();


router.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});


router.post('/usuarios', async (req, res) => {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        res.status(201).json({ id: result.insertId, nombre, email });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear', error: error.message });
    }
});

export default router;