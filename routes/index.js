const express = require("express");
const router = express.Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.status(200).json({message:"Bienvenue sur le test technique Unkle"});
});




module.exports = router;
