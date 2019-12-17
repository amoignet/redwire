const express = require("express");
const app = express();
const port = 3000;

//CORS POLICY 1/2
// var cors = require('cors');

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});


const connection = require("./conf");

// CORS POLICY 2/2
// app.use(cors());

// GET

app.get("/api/filrouge", (req, res) => {
  // connection à la base de données, et sélection des produits
  connection.query("SELECT * from shop", (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send("Erreur lors de la récupération des produits");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

  app.get("/api/filrouge/name", (req, res) => {
    // connection à la base de données, et sélection des produits
    connection.query("SELECT name FROM shop", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des produits par nom");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
});


app.get("/api/filrouge/choco", (req, res) => {
    // connection à la base de données, et sélection des produits
    connection.query("SELECT * FROM shop WHERE name LIKE 'choco%'", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des produits dont la date est supérieur au 11/11/2019");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
});

app.get("/api/filrouge/datesup", (req, res) => {
    // connection à la base de données, et sélection des produits
    connection.query("SELECT * FROM shop WHERE delivery_date > '2019/11/11'", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des produits livrés après le 11 novembre 2019");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
});

app.get("/api/filrouge/date%decroissante", (req, res) => {
    // connection à la base de données, et sélection des produits
    connection.query("SELECT * FROM shop ORDER BY delivery_date DESC", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des produits par ordre de livraison décroissant");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
});




// POST

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// écoute de l'url "/api/filrouge" avec le verbe POST
app.post('/api/filrouge/insertion', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion du nouveau produit
  connection.query('INSERT INTO shop SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un nouveau produit");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});



// PUT

// écoute de l'url "/api/filrouge" avec le verbe PUT
app.put('/api/filrouge/modification/:id', (req, res) => {

    // récupération des données envoyées
    const formData = req.body;
  
    // connexion à la base de données, et modification du nouveau produit
    connection.query('UPDATE shop SET? WHERE id=?', formData, (err, results) => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un produit");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });


// écoute de l'url "/api/filrouge" avec le verbe PUT
app.put('/api/filrouge/toggle', (req, res) => {

    // récupération des données envoyées
    const formData = req.body;
  
    // connexion à la base de données, et modification du nouveau produit
    connection.query('UPDATE shop SET stocked=!stocked WHERE id=?', formData, (err, results) => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un produit");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });


// DELETE

// écoute de l'url "/api/filrouge"
app.delete('/api/filrouge/:id', (req, res) => {

    // récupération des données envoyées
    const idBoard = req.params.id;
  
    // connexion à la base de données, et suppression du produit
    connection.query('DELETE FROM shop WHERE id = ?', [idBoard], err => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un produit");
      } else {
  
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });

  

  // écoute de l'url "/api/filrouge/deletefalse"
app.delete('/api/filrouge/deletefalse', (req, res) => {

    // récupération des données envoyées
    const idProduct = req.params.id;
  
    // connexion à la base de données, et suppression du produit
    connection.query('DELETE FROM shop WHERE stocked = 0', [idProduct], err => {
  
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un produit");
      } else {
  
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  });
  





