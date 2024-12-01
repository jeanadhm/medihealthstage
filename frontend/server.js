const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'johndev',
  password: 'Adhm229@',
  database: 'unpaid',
  port: 3306 // Port MySQL
});

// Connexion à la base de données MySQL
connection.connect(err => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Route pour enregistrer les données du formulaire dans la base de données
app.post('/enregistrer-utilisateur', (req, res) => {
  const { firstName, lastName, civility, dateOfBirth, city, country, idProof, proofOfAddress } = req.body;

  // Exécutez la requête SQL pour insérer les données dans la base de données
  const sqlQuery = 'INSERT INTO utilisateurs (firstName, lastName, civility, dateOfBirth, city, country, idProof, proofOfAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sqlQuery, [firstName, lastName, civility, dateOfBirth, city, country, idProof, proofOfAddress], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur dans la base de données :', err);
      res.status(500).send('Erreur serveur lors de l\'enregistrement de l\'utilisateur');
      return;
    }
    console.log('Utilisateur enregistré avec succès dans la base de données');
    res.status(200).send('Utilisateur enregistré avec succès');
  });
});

// Autres routes et logique de votre application...

// Démarre le serveur Express.js
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur Express.js en cours d'exécution sur le port ${PORT}`);
});
