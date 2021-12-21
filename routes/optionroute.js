const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionControllers');
const { requireAuth, checkUser , checkRoleAdmin  } = require('../middleware/authMiddleware');


//Création d'une option
router.post("/",requireAuth, checkUser , checkRoleAdmin, optionController.postOption);

//Supression d'une option
router.delete('/:optionId', requireAuth , checkUser,  checkRoleAdmin,  optionController.deleteOption);

//Liste des options
router.get("/",requireAuth, checkUser , optionController.getOption)


module.exports = router;