import { Router } from "express";
import { 
    getOrderDetails, 
    getOrderDetailsByOrderId, 
    createOrderDetail, 
    updateOrderDetail, 
    deleteOrderDetail 
} from "../controllers/orderDetails.controller.js";

const router = Router();

router.get('/detalles_pedido', getOrderDetails);
router.get('/detalles_pedido/:id_pedido', getOrderDetailsByOrderId);
router.post('/detalles_pedido', createOrderDetail);
router.put('/detalles_pedido/:id', updateOrderDetail);
router.delete('/detalles_pedido/:id', deleteOrderDetail);

export default router;
