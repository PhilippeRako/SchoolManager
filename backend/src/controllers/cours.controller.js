const db = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cours');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.create = async (req, res) => {
    try {
        const { nom } = req.body;
        if (!nom) return res.status(400).json({ error: 'Nom requis' });

        await db.query('INSERT INTO cours (nom) VALUES (?)', [nom]);
        res.json({ message: 'Cours créé' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom } = req.body;
        await db.query('UPDATE cours SET nom=? WHERE id=?', [nom, id]);
        res.json({ message: 'Cours modifié' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM cours WHERE id=?', [id]);
        res.json({ message: 'Cours supprimé' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// relation cours-classes
exports.addClasse = async (req, res) => {
    try {
        const { id } = req.params; // cours_id
        const { classe_id } = req.body;
        if (!classe_id) return res.status(400).json({ error: 'Classe requise' });

        await db.query('INSERT INTO cours_classes (cours_id, classe_id) VALUES (?, ?)', [id, classe_id]);
        res.json({ message: 'Classe attribuée au cours' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const { id } = req.params; // cours_id
        const [rows] = await db.query(
            `SELECT cl.* FROM cours_classes cc 
       JOIN classes cl ON cc.classe_id = cl.id 
       WHERE cc.cours_id = ?`,
            [id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
