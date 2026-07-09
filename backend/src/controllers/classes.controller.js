const db = require('../config/db');

exports.getAll = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM classes');
    res.json(rows);
};

exports.create = async (req, res) => {
    try {
        const { nom } = req.body;
        if (!nom) return res.status(400).json({ error: 'Nom requis' });

        await db.query('INSERT INTO classes (nom) VALUES (?)', [nom]);
        res.json({ message: 'Classe créée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom } = req.body;
        await db.query('UPDATE classes SET nom=? WHERE id=?', [nom, id]);
        res.json({ message: 'Classe modifiée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM classes WHERE id=?', [id]);
        res.json({ message: 'Classe supprimée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
