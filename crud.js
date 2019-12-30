const sqlite3 = require("sqlite3");
var returnDb = null; // permet de stocker la réponse

//  créer une base °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

//  creation / Connection à la base avec verif

// chemin et nom de la base = creée auto
const dbName = "data/bdd.db";

// connection
dbConnect = new sqlite3.Database(dbName, err => {
  if (err) {
    throw err;
  } else {
    console.log("connecté");
  }
});

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// Les fonctions de base (exemples)

// Les req
// .get : recupére la première ligne
// .all toutes les lignes = un tableau est retourné
// .each : chaque ligne?
// .run pour toutes les autreturnDboperations
// l'ordre dans la req est important
// mettre les req à faire dans l'ordre dans une fonction
// serialize sinon c'est async
//db . serialize ( function () { 
// https://github.com/mapbox/node-sqlite3/wiki/Control-Flow



// insérer des données °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// Créer une table et les champs // le faire avec ui ( plus simple et rapide) 

dbConnect.run(" CREATE TABLE table1(name VARCHAR(255))")


// créer une table avec insertion des  et colonnes

const createTable = () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
    insertData
  );
};

// Insertion de data

const insertData = () => {
  db.run("INSERT INTO contacts (name) VALUES (?)", ["contact 001"]);
};

// ajouter une donnée

dbConnect.run("INSERT INTO table1(name) VALUES(?)", ["Martin"])
// values c'est ce que contiendra le champ, il est relié à l'objet passé en params

// SELECT nom_du_champ FROM nom_du_tableau = comprendre lire le/les  champ nom du tableau
// en get se sera la première ligne touvée

//  Lire les données )°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// faire un get = recup la première ligne de ce qui est demandé
// (*) all pour 'toutes les colonnes  '

dbConnect.all("select * from table1", (err, data)=>{
    if (err) {
        throw err
    } else {
        console.log(data)

    }
})

dbConnect.all("select * from table1", (err, data) => {
  if (err) {
    throw err;
  } else {
    reponsedbConnect.push(data);
    console.log("le contenu est " + reponsedbConnect[0][0]);
  }
});

// le each : le call back est lancé pour chaque ligne retournée sinon ce n'est qu'à la fin

dbConnect.each("select * from table1", (err, data)=>{
    if (err) {
        throw err
    } else {
        reponsedbConnect.push(data)
        console.log("le contenu est " + reponsedbConnect[0][0] )

    }
})

// recupérer une colonne particulière ou plusieurs ( les séparer par une virgule )
// where : on peut aussi utiliser <  ou > =  != ... >=

dbConnect.get("select name, id from table1 where id = 2", (err, data)=>{
    if (err) {
        throw err
    } else {
        returnDb= data

        console.log(res)

    }
})

// exemple : afficher une liste de noms

dbConnect.all("select name from  table1", (err, data)=>{
    if (err) {
        throw err
    } else {
        returnDb= data
        for (const key in returnDb) {
            // method de recup sur l'objet 
            console.log(returnDb[key].name)

        }

// autre methode sur l'objet si on à besoin que de la valeur et non de la clé ( plus courant)
Object.values(returnDb)
        .forEach(value => {
            console.log(value.name);
        });
}
}
)

// faire un all = retourne un tableau avec le contenu
// + recupération de la réponse dans une variable

// trier directement le resultat asc ou desc
dbConnect.all("select name  from table1 order by note desc", (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data)

  }
})

// sortir un tableau  ordonné
dbConnect.all("select *  from table1 order by id asc limit 3", (err, data) => {
  if (err) {
    throw err;
  } else {
    returnDb = data

    for (const key in returnDb ) {
        console.log(data[key].note)

    }
  }
})

// limiter le nb de resp
dbConnect.all("select *  from table1 order by id asc limit 3", (err, data) => {
  if (err) {
    throw err;
  } else {
    returnDb = data

    for (const key in returnDb ) {
        console.log(data[key].note)

    }
  }
})

// limiter le nb de resp et dans une plage donnée : entres tant et tant offset

dbConnect.all("select *  from table1 order by id asc limit 4 offset 2", (err, data) => {
  if (err) {
    throw err;
  } else {
    returnDb = data

    for (const key in returnDb ) {
        console.log(data[key].note)

    }
  }
})

// limiter le nb de resp et dans une plage donnée : entres tant et tant offset et trié
// comprendre offset 3 = mettre de coté les 3 premiers res et démarrer à 4

dbConnect.all("select *  from table1 order by id asc limit 4 offset 2", (err, data) => {
  if (err) {
    throw err;
  } else {
    returnDb = data

    for (const key in returnDb ) {
        console.log(data[key].note)

    }
  }
})

// limiter le nb de resp et dans une plage donnée : entres tant et tant offset
// ici je trie les noms triès par notes desc et j'exclue le meilleur et je m'arrete A 3 result

dbConnect.all("select * from table1 order by note  desc limit 3  offset 1", (err, data) => {
  if (err) {
    throw err;
  } else {
    returnDb = data;

    for (const key in returnDb) {
      console.log(data[key]);
    }
  }
})

// meilleure manière de faire ( plus claire)

var req = "select * FROM table1 ORDER BY note DESC LIMIT 3  OFFSET 1"

dbConnect.all( req , (err, data) => {
    if (err) {
        throw err;
    } else {
        returnDb = data;

        for (const key in returnDb) {
            console.log(data[key]);
        }
    }
})

//  Un Autre exemple  : retourne toutes les notes inf à 1OO et trié en asc

req33 = "select * from table1 where note < 200 order by id asc ";

dbConnect.all(req33, (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data);
  }
});

// Insérer des données °°°°°°°°°°°°°°°°°°°°°°°°°°°°

// attention au simple '' dans le values
//  attention à l'ordre : inserer dans la table .. dans les colonnes ... les valeurs
// pour entre run null ne rien mettre

var req2 = "insert into table1 (name, note) values(?, ?) "

dbConnect.run(req2, [ "Magalie",  23] ,  (err, data)=>{
    if (err) {
        throw err
    }else {
        console.log('ajouté')

    }

})

//  UPDATE  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

// attention au simple ''
// set : comprendre la ou les colonnes à modifier.
req4 = "UPDATE table1 SET name = 'YANOU' where id = 1 "

dbConnect.run(req4, (err)=>{
    if (err) {
        throw err
    } else {
        console.log('changé')

    }
})

// version sécure

req4 = "UPDATE table1 SET name = ? , note = ?  where id = ? "

dbConnect.run(req4, ['BATMAN',0 , 2], (err)=>{
    if (err) {
        throw err
    } else {
        console.log('changé')

    }
})

//  utilisation des params nommés : plus clair

req4 = "UPDATE table1 SET name = $name , note = $note  where id = $id "

dbConnect.run(req4, {

    $id : 3,
    $name  : 'Louis',
    $note : 2

}, (err) => {
    if (err) {
        throw err
    } else {
        console.log('Updated ! ')

    }
})

// SUPPRIMER : delete

// simple 
req5 = "DELETE from table1 WHERE name = $name ";

dbConnect.run(req5, {
    $name: 'servane'
}, (err) => {
    if (err) {
        throw err
    } else {
        console.log('Suppimée !!!')

    }
})
// ex : supprime les notes nulles

// supprimer des champs nuls !!!
req5 = "DELETE from table1 WHERE note IS NULL OR trim(note) = '' ";

dbConnect.run(req5, (err)=>{
    if (err) {
        throw err
    } else {

        console.log('Suppimée !!!')

    }
})

// expl : supprimer les notes inf à 10
req5 = "DELETE from table1 WHERE note IS NULL OR trim(note) = '' OR note < ?  ";

dbConnect.run(req5, [10], err => {
  if (err) {
    throw err;
  } else {
    console.log("Suppimée !!!");
  }
})

// fermer la base
// dbConnect.close(()=>{
//     console.log('fermeture de la base')

// })

console.log();
