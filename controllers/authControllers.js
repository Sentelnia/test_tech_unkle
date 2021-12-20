const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Token = require("../utils/token.js")


module.exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  let logIn = { message: "" };
  if (!email) {
    logIn.message = "Need Mail";
    res.status(403).json(logIn);
    return;
  }

  if (!password) {
    logIn.message = "Need Password";
    res.status(403).json(logIn);
    return;
  }

  if (email && password) {
    // Check si Email Adress dans base
    User.findOne({ email })
      .then((foundUser) => {
        // => Si non,
        if (!foundUser) {
          logIn.message = "Mail no found";
          res.status(403).json(logIn);
          return;
        }
        if (foundUser.isValid === false) {
          logIn.message = "Please, valid your email";
          res.status(400).json(logIn);
          return;
        }

        bcrypt
          .compare(password, foundUser.password)
          .then((auth) => {
            if (!auth) {
              logIn.message = "Bad password";
              res.status(400).json(logIn);
              return;
            }

            const token = Token.createToken(foundUser._id);

            res.header("Authorization", "Bearer " + token);
            res.status(200).json({
              message: "Vous êtes connecté",
            });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  }
};


module.exports.logout = (req, res) => {
  res.header("Authorization", "Bearer " + "");
  res.status(200).json({ message: "Vous avez bien été déconnecté" });
};

// Détails d'un user

module.exports.getUser = (req, res, next) => {
  const userId = res.locals.user._id;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        logIn.message = "User no found";
        res.status(403).json(logIn);
        return;
      }

      const user = {
        name: foundUser.name
      };
      res.status(200).json({ user });
    })
    .catch((err) => next(err));
};

// Modifier les données d'un User

module.exports.putUser = (req, res, next) => {
  const userId = res.locals.user._id;
  const { name } = req.body;
  let newUser;
 
  User.findById(userId)
    .then((foundUser) => {
     
        newUser = {
          name
        };
        User.findByIdAndUpdate(userId, newUser)
          .then((user) => {
            res.status(200).json({
              user: newUser,
              message: "Vos modifications ont bien été enregistrées",
            });
          })
          .catch((err) => res.status(400).json(err));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Modification du mot de passe

module.exports.PostModifPass = (req, res, next) => {
  const { password, newpassword, newpasswordVerif } = req.body;
  const userId = res.locals.user._id;

  if (!password) {
    res.status(403).json({ message: "Need password" });
    return;
  }
  if (!newpassword) {
    res.status(403).json({ message: "Need  new password" });
    return;
  }

  if (newpassword === newpasswordVerif) {
    User.findById(userId)
      .then((user) => {
        bcrypt.compare(password, user.password).then((auth) => {
          if (auth === false) {
            res.status(400).json({ message: "Mot de passe incorrect" });
            return;
          }

          if (newpasswordVerif === newpassword) {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(newpassword, salt);

            user.password = hashPass;
            user
              .save()
              .then((user) => {
                res.status(200).json({
                  message: "Votre mot de passe a bien été modifié",
                });
              })
              .catch((err) => next(err));
          } else {
            res
              .status(400)
              .json({ message: "Veuillez saisir le même mot de passe" });
          }
        });
      })
      .catch((err) => next(err));
  } else {
    res
      .status(400)
      .json({ message: " password doit etre égale a passworVerif" });
  }
};
