const Contrat = require("../models/Contrat.model");
const User = require("../models/User.model");
const Option = require("../models/Option.model");
const ObjectId = require("mongodb").ObjectId;

//Créer un Contrat

module.exports.postContrat = (req, res, next) => {
  const { number, startDate, endDate, options, clients } = req.body;

  //Vérification de la présence des champs obligatoires
  //Date obligatoire
  !startDate &&
    res
      .status(453)
      .json({ message: "La date de début de contrat est obligatoire" });

  //Option obligatoire (au moins une)
  options.length === 0 &&
    res.status(454).json({ message: "Il faut au moins ajouter une option" });

  //Client obligatoire (au moins un)
  clients.length === 0 &&
    res.status(454).json({ message: "Il faut au moins ajouter un client" });

  //Verifications des doublons d'options et Transformation objectId
  const optionsUnique = [...new Set(options)].map(
    (option) => new ObjectId(option)
  );

  //Verifications des doublons de clients et Transformation objectId
  const clientsUnique = [...new Set(clients)].map(
    (client) => new ObjectId(client)
  );

  const contrat = {
    number,
    startDate,
    endDate,
    options: optionsUnique,
    clients: clientsUnique,
    endDate,
  };

  Contrat.create(contrat)
    .then((contrat) => {
      res
        .status(201)
        .json({
          message: `le contrat numéro ${contrat.number} a bien été créé`,
        });
    })
    .catch((err) => next(err));
};

// Liste des contrat coté client

module.exports.getContratClient = (req, res, next) => {
  const userId = res.locals.user._id;

  Contrat.find({ clients: userId })
    .populate("options")
    .populate("clients")
    .then((foundContrats) => {
      if (!foundContrats) {
        res.status(403).json({ message: "Contrat no found" });
        return;
      }

      let contrats = [];

      foundContrats.forEach((contrat) => {
        contrats.push(contrat);
      });

      res.status(200).json({ contrats });
    })
    .catch((err) => next(err));
};

//Résiliation du contrat coté client

module.exports.putContrat = (req, res, next) => {
  const userId = res.locals.user._id;
  const { contratId, resiliationDate } = req.body;

  Contrat.findById(contratId)
    .then((foundContrat) => {
      if (!foundContrat) {
        res.status(403).json({ message: "Contrat no found" });
        return;
      }

      let authorization = false;
      //Authorisation de résiliation uniquement pour les clients concerné par le contrat
      foundContrat.clients.forEach((client) => {
        if (JSON.stringify(client) === JSON.stringify(userId)) {
          authorization = true;
        }
      });

      authorization === false &&
        res
          .status(403)
          .json({ message: "Vous n'êtes pas authorisé à résilier ce contrat" });

      //si il n'y a pas de date précisée
      !resiliationDate
        ? (foundContrat.resiliationDate = Date.now())
        : (foundContrat.resiliationDate = resiliationDate);
      foundContrat.resiliation = true;

      foundContrat
        .save()
        .then((contrat) => {
          res.status(200).json({ contrat });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
