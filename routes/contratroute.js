const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contratControllers');
const { requireAuth, checkUser , checkRoleAdmin  } = require('../middleware/authMiddleware');


//Création d'un contrat
router.post("/",requireAuth, checkUser , checkRoleAdmin, contratController.postContrat);

//Liste des contrats
    //Pour un client
    router.get("/",requireAuth, checkUser , checkRoleAdmin, contratController.getContratClient);


module.exports = router;