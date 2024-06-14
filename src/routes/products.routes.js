import { Router } from "express";
import { 
    getProducts, 
    getProductById,
    getProductsByCategory, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/products.controller.js";

const router = Router();

router.get('/productos', getProducts); 
router.get('/productos/:id', getProductById);
router.get('/productos/categoria/:category', getProductsByCategory);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

export default router;
