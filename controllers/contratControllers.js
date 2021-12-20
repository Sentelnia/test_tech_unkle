const Contrat = require("../models/Contrat.model");
const User = require("../models/User.model");
const Option = require("../models/Option.model")



//Créer un Contrat

module.exports.postContrat = (req, res, next) => {
    const { number, startDate, endDate, options, clients} = req.body;

    //Verifications des doublons  d'options
    const optionsUnique = [...new Set(options)]

    const contrat = {
        number,
        startDate,
        endDate,
        options : optionsUnique,
        clients,
        endDate
    }

    Contrat.create(contrat)
    .then((contrat) => {
        res.status(201).json({message:`le contrat numéro ${contrat.number} a bien été créé`})
    })
    .catch(err => next(err))
  
  };
  
