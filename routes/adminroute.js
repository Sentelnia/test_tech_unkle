const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const { requireAuth, checkRoleAdmin, checkUser } = require('../middleware/authMiddleware');


//acceder à la liste des utilisateurs
router.get('/users', requireAuth , checkUser, checkRoleAdmin,  adminController.getUsers);

//Création d'un utilisateur
router.post("/signup", requireAuth , checkUser, checkRoleAdmin, adminController.postSignup);


//Suppression d'un utilisateur
router.delete("/deletuser/:userId", requireAuth , checkUser, checkRoleAdmin, adminController.deleteUser);

module.exports = router;
