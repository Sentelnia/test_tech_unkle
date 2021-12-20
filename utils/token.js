const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

//create token
// token acces

module.exports.createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
  };
  
  