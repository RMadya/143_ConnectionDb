const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;


const app = express();
// parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// GET /mahasiswa - return all mahasiswa
app.get('/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM biodata';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('DB error on SELECT:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


// POST /mahasiswa - create new mahasiswa
app.post('/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;
    // basic validation
    if (!nama || !alamat || !agama) {
        return res.status(400).json({ error: 'nama, alamat, and agama are required' });
    }

    const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
    db.query(sql, [nama, alamat, agama], (err, result) => {
        if (err) {
            console.error('DB error on INSERT:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // return the created resource id and data
        res.status(201).json({ id: result.insertId, nama, alamat, agama });
    });
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3309',
    password: 'Ragehaste90!',
    database: 'mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to mysql:', err.stack);
        return;
    }
    console.log('Connected to mysql successfully');
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})