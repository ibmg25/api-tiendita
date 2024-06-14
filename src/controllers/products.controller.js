import { pool } from "../db.js";

export const getProducts = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM Productos');
    res.json(result);
};

export const getProductById = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM Productos WHERE id = ?', [req.params.id]);
    if (result.length === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
    } else {
        res.json(result[0]);
    }
};

export const createProduct = async (req, res) => {
    const { title, price, description, category, image, rate, count } = req.body;
    const [result] = await pool.query('INSERT INTO Productos (title, price, description, category, image, rate, count) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, price, description, category, image, rate, count]);
    res.json({
        id: result.insertId,
        title,
        price,
        description,
        category,
        image,
        rate,
        count
    });
};

export const updateProduct = async (req, res) => {
    const { title, price, description, category, image, rate, count } = req.body;
    const [result] = await pool.query('UPDATE Productos SET title = ?, price = ?, description = ?, category = ?, image = ?, rate = ?, count = ? WHERE id = ?', [title, price, description, category, image, rate, count, req.params.id]);
    if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
    } else {
        res.json({ message: 'Producto actualizado' });
    }
};

export const deleteProduct = async (req, res) => {
    const [result] = await pool.query('DELETE FROM Productos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
    } else {
        res.json({ message: 'Producto eliminado' });
    }
};
