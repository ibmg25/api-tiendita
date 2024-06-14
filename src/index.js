import express from 'express';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from "./routes/orders.routes.js";
import orderDetailsRoutes from "./routes/orderDetails.routes.js";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',  // Permitir solicitudes desde localhost:4200
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Encabezados permitidos
  }));
app.use(express.json());

app.use('/api-tiendita', productsRoutes);
app.use('/api-tiendita', ordersRoutes);
app.use('/api-tiendita', orderDetailsRoutes);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

