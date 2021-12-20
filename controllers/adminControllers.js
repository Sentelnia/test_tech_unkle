const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

//Listes des utilsateurs
module.exports.getUsers = (req, res, next) => {
   
    User.find()
      .sort({name:1})  
      .then((users) => {
        res.status(201).json({ users });
      })
      .catch((err) => {
        const errors = handleErrorSignup(err);
        res.status(400).json({ errors });
      });
  };


//Créer un utilisateur
//HandleError
const handleErrorSignup = (err) => {
  let errors = {
    email: "",
    name: "",
    password: "",
    role:""
  };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
//-------------------------//

module.exports.postSignup = (req, res) => {
  const { email, name, role, password } = req.body;

  User.create({
    email,
    name,
    role,
    password: hashPass,
  })
    .then((user) => {
    
      res.status(201).json({ message: `L'utilsateur ${user.name} a bien été créé`});
    })
    .catch((err) => {
      const errors = handleErrorSignup(err);
      res.status(400).json({ errors });
    });
};

// Supprimer un User

module.exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    
    User.findByIdAndRemove(userId)
      .then((foundUser) => {
              res.status(200).json({
                message: `L'utilisateur ${foundUser.name} a bien été supprimé`
              });
            })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  