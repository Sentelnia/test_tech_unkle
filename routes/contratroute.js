const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contratControllers');
const { requireAuth, checkUser , checkRoleAdmin  } = require('../middleware/authMiddleware');
const {updateDbContratClient}= require('../middleware/updateDB')

//Création d'un contrat
router.post("/",requireAuth, checkUser , checkRoleAdmin, contratController.postContrat);

//Liste des contrats pour un client
router.get("/",requireAuth, checkUser , updateDbContratClient, contratController.getContratClient);

//Resiliation d'un contrat pour un client
router.put("/", requireAuth, checkUser, contratController.putContrat)


module.exports = router;