const User = require("../models/User.model");
const Contrat = require("../models/Contrat.model");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

//Listes des utilsateurs
module.exports.getUsers = (req, res, next) => {
  User.find()
    .sort({ name: 1 })
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
    role: "",
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

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    email,
    name,
    role,
    password: hashPass,
  })
    .then((user) => {
      res
        .status(201)
        .json({ message: `L'utilsateur ${user.name} a bien été créé` });
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
        message: `L'utilisateur ${foundUser.name} a bien été supprimé`,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//CONTRAT

// Liste des contrat coté admin

module.exports.getContratAdmin = (req, res, next) => {
  Contrat.find()
    .populate("options")
    .populate("clients")
    .then((foundContrats) => {
      if (!foundContrats) {
        res.status(403).json({ message: "Contrat no found" });
        return;
      }
     
      let contrats = [];

      foundContrats.forEach((contrat) => {
        contrats.push(contrat);
      });

      res.status(200).json({ contrats });
    })
    .catch((err) => next(err));
};

// Liste des contrat coté admin par client

module.exports.getContratAdminClient = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  Contrat.find({ clients: new ObjectId(userId) })
    .populate("options")
    .populate("clients")
    .then((foundContrats) => {
      if (!foundContrats) {
        res.status(403).json({ message: "Contrat no found" });
        return;
      }
      
      let contrats = [];

      foundContrats.forEach((contrat) => {
        contrats.push(contrat);
      });

      res.status(200).json({ contrats });
    })
    .catch((err) => next(err));
};

//Résiliation du contrat coté admin

module.exports.putContrat = (req, res, next) => {
  const { contratId, resiliationDate } = req.body;

  Contrat.findById(contratId)
    .then((foundContrat) => {
      if (!foundContrat) {
        res.status(403).json({ message: "Contrat no found" });
        return;
      }

      //si il n'y a pas de date précisée
      !resiliationDate
        ? (foundContrat.resiliationDate = Date.now())
        : (foundContrat.resiliationDate = resiliationDate);
      foundContrat.resiliation = true;

      foundContrat
        .save()
        .then((contrat) => {
          res.status(200).json({ contrat });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
