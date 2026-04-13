import express from 'express';
import { pool } from './db.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();


app.use(express.json());


app.use(usuariosRoutes);

app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT "Conectado a MySQL" AS result');
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor encendido en el puerto ${PORT}');
});