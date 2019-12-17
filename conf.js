const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  process.env.user2, // le nom d'utilisateur
password :  process.env.password2, // le mot de passe
database :  process.env.database2, // le nom de la base de données
});
module.exports = connection;