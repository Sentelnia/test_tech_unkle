const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const User = require("../models/User.model.js")

const requireAuth = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.substr(7);
    jwt.verify(token, SECRET_TOKEN, (err, decodedToken) => {
   
      if (err) {
   
        res.status(403).json({ message: "accès non autorisé" });
      } else {
       
        next();
      }
    });
  } else {
    res.status(401).json({ message: "accès non autorisé" });
  }
};

const checkUser = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.substr(7);
    jwt.verify(token, SECRET_TOKEN, (err, decodedToken) => {
      if (err){
       
        res.locals.user = null;
        next();
      } else {
        User.findById(decodedToken.id)
          .then(foundUser => {
            res.locals.user = foundUser
            next();
          })
          .catch(error => next(error));       
      }
    })
  } else {
    next()
  }
};

const checkRoleAdmin = (req, res, next) => {

  if(res.locals.user.role === "ADMIN"){
    next();
    
  } else{
    res.status(403).json({message : "accès non autorisé"})
  }
}

module.exports = { requireAuth, checkUser, checkRoleAdmin };