import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root1234',
  port: 3306,
  database: 'creaciones_yuyita'
});

const testConnection = async () => {
try {
    const connection = await pool.getConnection();
    console.log('Conectado a la base de datos: creaciones_yuyita');
    connection.release();
} catch (error) {
    console.error('Error de conexión:', error.message);
}
};

testConnection();