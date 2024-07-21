// backend
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000 || process.env.PORT;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use('/schoolImages', express.static(path.join(__dirname, 'schoolImages')));

const storage = multer.diskStorage({
    destination: './schoolImages',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.post('/api/schools', upload.single('image'), (req, res) => {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? `/schoolImages/${req.file.filename}` : null;
    db.query(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, image, email_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'School added successfully!' });
        }
    );
});

app.get('/api/schools', (req, res) => {
    db.query('SELECT * FROM schools', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port : ${port}`);
});
