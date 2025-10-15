const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3309',
    password : 'Ragehaste90!',
    database : 'mahasiswa'
})
db.connect((err) => {
    if(err) {
        console.log('Error connecting to Mysql: ' + err.stack);
        return;
    }
    console.log('Connectted to Mysql successfully');
})

app.listen(PORT, () => {
    console.log(`Serverf is running on port http://localhost:${PORT}`);
})