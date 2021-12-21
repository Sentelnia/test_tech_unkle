const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const { requireAuth, checkRoleAdmin, checkUser } = require('../middleware/authMiddleware');

//Utilisateurs
//acceder à la liste des utilisateurs
router.get('/users', requireAuth , checkUser, checkRoleAdmin,  adminController.getUsers);

//Création d'un utilisateur
router.post("/signup", requireAuth , checkUser, checkRoleAdmin, adminController.postSignup);

//Suppression d'un utilisateur
router.delete("/deletuser/:userId", requireAuth , checkUser, checkRoleAdmin, adminController.deleteUser);


//contrats
//liste de tous les contrats
router.get('/contrats', requireAuth , checkUser, checkRoleAdmin, adminController.getContratAdmin)

//liste des contrats par client
router.get('/contrats/:userId', requireAuth , checkUser, checkRoleAdmin, adminController.getContratAdminClient)


module.exports = router;
