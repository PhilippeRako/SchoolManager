const db = require('../config/db');

exports.getAll = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM eleves');
    res.json(rows);
};

exports.create = async (req, res) => {
    const { nom, prenom, classe_id, date_naissance, age, adresse, telephone, urgence_nom, urgence_tel, email } = req.body;
    await db.query(
        `INSERT INTO eleves (nom, prenom, classe_id, date_naissance, age, adresse, telephone, urgence_nom, urgence_tel, email)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nom, prenom, classe_id || null, date_naissance || null, age || null, adresse || null, telephone || null, urgence_nom || null, urgence_tel || null, email || null]
    );
    res.json({ message: 'Élève créé' });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, classe_id, date_naissance, age, adresse, telephone, urgence_nom, urgence_tel, email } = req.body;
    await db.query(
        `UPDATE eleves SET nom=?, prenom=?, classe_id=?, date_naissance=?, age=?, adresse=?, telephone=?, urgence_nom=?, urgence_tel=?, email=? WHERE id=?`,
        [nom, prenom, classe_id || null, date_naissance || null, age || null, adresse || null, telephone || null, urgence_nom || null, urgence_tel || null, email || null, id]
    );
    res.json({ message: 'Élève modifié' });
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM eleves WHERE id=?', [id]);
    res.json({ message: 'Élève supprimé' });
};
