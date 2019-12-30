const express = require("./node_modules/express");
const sqlite3 = require("sqlite3");
var date = new Date()

const app = express();

app.use(express.json())

app.use('/a/:id',function (req, res, next) {
  console.log( "Requête : " + req.params.id)
  console.log(date)
  
  next()
})



var monobj = { name: "toto" };

app.get("/a/:name", (req, res) => {
  res.type("json")
  res.json(monobj.name)

});

const dbName = "data/bdd.db";

// connection
db = new sqlite3.Database(dbName, err => {
  if (err) {
    throw err;
  } else {
    console.log("connecté");
  }
});

app.get("/", (req, res) => {
  // appel à la bdd
  const readDAtaBdd = () => {
    // attendre le resultat
    return new Promise((resolve, reject) => {
      db.all(`select * from table1`, (err, data) => {
        if (err) {
          reject("Erreur de lecture de la base  !"); // si errurs
        } else {
          var reponseBd = data;
          resolve(reponseBd); // passage de la reponse à then
        }
      });
    });
  };

  readDAtaBdd()
    .then(reponseBd => {
      console.log(" Retour de la promesse : " + JSON.stringify(reponseBd));
      res.json(reponseBd); // affichage en json
      res.end();
    })
    .catch(() => {
      console.log("erreur dans la promesse ! ");
    });
});

//  Autre test sans affichage nav

console.log("Un");

// var A = 0;
// // les promesses 1 la declaration
// var P1 = new Promise((resolve, reject) => {
//   // simulation de données longues à obtenir
//   console.log("je lance la requete");
//   setTimeout(() => {
//     // le calcul ou la demande longue à attendre !
//     var result = 120 * 2;
//     resolve(result);
//     reject("problemo");
//   }, 2000);
// });
// P1.then(result => {
//   console.log("la reponse est :" + result);
// });

// Version sans le timer et les logs
app.get("/test", (req, res) => {
  var P1 = new Promise((resolve, reject) => {
    // operation longue
    var resultat = 13420 * 2;
    if (resultat) {
      resolve(resultat);
    } else {
      reject(message);
    }
    // quand j 'ai le resultat je le passse à then
  })
    .then(resultat => {
      res.json(resultat);
    })
    .catch(message => res.send("erreur de connection ! "));
});

app.listen(8080, () => {
  console.log("Port 8080");
})
