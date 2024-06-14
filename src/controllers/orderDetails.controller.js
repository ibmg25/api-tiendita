import { pool } from "../db.js";

export const getOrderDetails = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Detalles_Pedido');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Detalles_Pedido WHERE id_pedido = ?', [req.params.id_pedido]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Detalles del pedido no encontrados' });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrderDetail = async (req, res) => {
    const { id_pedido, id_producto, quantity, price } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Detalles_Pedido (id_pedido, id_producto, quantity, price) VALUES (?, ?, ?, ?)', [id_pedido, id_producto, quantity, price]);
        res.json({
            id: result.insertId,
            id_pedido,
            id_producto,
            quantity,
            price
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderDetail = async (req, res) => {
    const { id_pedido, id_producto, quantity, price } = req.body;
    try {
        const [result] = await pool.query('UPDATE Detalles_Pedido SET id_pedido = ?, id_producto = ?, quantity = ?, price = ? WHERE id = ?', [id_pedido, id_producto, quantity, price, req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Detalle del pedido no encontrado' });
        } else {
            res.json({ message: 'Detalle del pedido actualizado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrderDetail = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Detalles_Pedido WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Detalle del pedido no encontrado' });
        } else {
            res.json({ message: 'Detalle del pedido eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
