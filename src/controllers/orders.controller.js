import { pool } from "../db.js";

export const getOrders = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Pedidos');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Pedidos WHERE id = ?', [req.params.id]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Pedido no encontrado' });
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { customer_name, customer_address, total } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Pedidos (customer_name, customer_address, total) VALUES (?, ?, ?)', [customer_name, customer_address, total]);
        res.json({
            id: result.insertId,
            customer_name,
            customer_address,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { customer_name, customer_address, total } = req.body;
    try {
        const [result] = await pool.query('UPDATE Pedidos SET customer_name = ?, customer_address = ?, total = ? WHERE id = ?', [customer_name, customer_address, total, req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Pedido no encontrado' });
        } else {
            res.json({ message: 'Pedido actualizado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Pedidos WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Pedido no encontrado' });
        } else {
            res.json({ message: 'Pedido eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
