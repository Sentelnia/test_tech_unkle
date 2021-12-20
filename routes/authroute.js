const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { requireAuth, checkRoleAdmin, checkUser } = require('../middleware/authMiddleware');


//Inscription , connection et déconnection
router.post("/signup", authController.postSignup);
router.post("/login",authController.postLogin);
router.get('/logout', requireAuth , checkUser, authController.logout);

//détails
router.get('/user', requireAuth , checkUser, authController.getUser);

//Modifications
router.put('/user', requireAuth , checkUser, authController.putUser);
router.post('/modifpass', requireAuth , checkUser, authController.PostModifPass);

module.exports = router;