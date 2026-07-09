const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const classesRoutes = require('./routes/classes.routes');
const elevesRoutes = require('./routes/eleves.routes');
const coursRoutes = require('./routes/cours.routes');
const presencesRoutes = require('./routes/presences.routes');

app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/eleves', elevesRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/presences', presencesRoutes);

app.listen(3000, () => {
    console.log('SchoolManager API running on port 3000');
});
