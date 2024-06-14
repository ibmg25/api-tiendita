import express from 'express';
import productsRoutes from './routes/products.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1', productsRoutes);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
