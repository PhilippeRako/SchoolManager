const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        return res.status(401).json({ error: 'Email incorrect' });
    }

    const user = rows[0];


    if (user.password !== password) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
    }


    const token = jwt.sign(
        { id: user.id, role: user.role },
        'SECRET_KEY',
        { expiresIn: '1d' }
    );

    res.json({
        message: 'Connexion réussie',
        token,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom
    });
};
