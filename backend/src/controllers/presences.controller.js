const db = require('../config/db');

exports.getAll = async (req, res) => {
    const [rows] = await db.query(
        `SELECT p.*, e.nom AS eleve_nom, e.prenom AS eleve_prenom, co.nom AS cours_nom
     FROM presences p
     JOIN eleves e ON p.eleve_id = e.id
     JOIN cours co ON p.cours_id = co.id`
    );
    res.json(rows);
};

exports.create = async (req, res) => {
    const { eleve_id, cours_id, date, statut } = req.body;
    await db.query(
        'INSERT INTO presences (eleve_id, cours_id, date, statut) VALUES (?, ?, ?, ?)',
        [eleve_id, cours_id, date, statut]
    );
    res.json({ message: 'Présence créée' });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;
    await db.query(
        'UPDATE presences SET statut = ? WHERE id = ?',
        [statut, id]
    );
    res.json({ message: 'Présence modifiée' });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM presences WHERE id = ?', [id]);
    res.json({ message: 'Présence supprimée' });
};
