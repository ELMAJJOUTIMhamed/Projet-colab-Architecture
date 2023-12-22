const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./models/config/database");
const auteur_apiRoute = require('./routes/AuteurDAO');
const cadeaux_apiRoute = require('./routes/CadeauxDAO');
const liste_cadeaux_apiRoute = require('./routes/Liste_cadeauxDAO');

const process = require('process');
const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000',  // specify the origin
  methods: 'GET,PUT,POST,DELETE', // specify the allowed methods
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", auteur_apiRoute);
app.use("/", cadeaux_apiRoute);
app.use("/", liste_cadeaux_apiRoute);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
});

// Exporte l'application Express
module.exports = app;
