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