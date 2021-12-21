const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { requireAuth,checkUser } = require('../middleware/authMiddleware');


//Connection et déconnection
router.post("/login",authController.postLogin);
router.get('/logout', requireAuth , checkUser, authController.logout);

//détails
router.get('/', requireAuth , checkUser, authController.getUser);

//Modifications
router.put('/', requireAuth , checkUser, authController.putUser);
router.post('/modifpass', requireAuth , checkUser, authController.PostModifPass);

module.exports = router;