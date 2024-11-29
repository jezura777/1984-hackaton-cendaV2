const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Vytvoření aplikace Express
const app = express();
const port = 5000;

// Povolení CORS pro frontend
app.use(cors());

// Nastavení připojení k databázi
const db = mysql.createConnection({
  host: 'localhost',     // adresa vaší databáze
  user: 'root',          // uživatel
  password: '',          // heslo
  database: 'my_database' // název databáze
});

// Ověření připojení k databázi
db.connect(err => {
  if (err) {
    console.error('Chyba při připojování k databázi:', err);
    return;
  }
  console.log('Úspěšně připojeno k databázi.');
});

// Definování API endpointu pro získání dat
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM my_table'; // nahraďte 'my_table' názvem vaší tabulky
  db.query(query, (err, results) => {
    if (err) {
      console.error('Chyba při získávání dat:', err);
      return res.status(500).json({ error: 'Chyba při získávání dat' });
    }
    res.json(results); // Odeslání dat jako JSON odpověď
  });
});

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});