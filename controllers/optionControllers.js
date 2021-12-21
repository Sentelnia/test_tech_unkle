const Option = require("../models/Option.model");

//Créer une Option

//HandleError
const handleErrorOption = (err) => {
    let errors = {
        identifiant: "",
      description: ""
    };
  
    //duplicate error code
    if (err.code === 11000) {
      errors.identifiant = "that identifiant is already registered";
      return errors;
    }
  
    //validation errors
    if (err.message.includes("Option validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  };

module.exports.postOption = (req, res, next) => {
    const { identifiant, description} = req.body;
    
    Option.create({
        identifiant,
        description
    })
      .then((option) => {

        res.status(201).json({ message: `L'option ${option.identifiant} a bien été créé`});
      })
      .catch((err) => {
        const errors = handleErrorOption(err);
        res.status(400).json({ errors });
      });
  };
  
  // Supprimer une Option
  
  module.exports.deleteOption = (req, res, next) => {
      const optionId = req.params.optionId;
      
      Option.findByIdAndRemove(optionId)
        .then((foundOption) => {
                res.status(200).json({
                  message: `L'option ${foundOption.identifiant} a bien été supprimé`
                });
              })
        .catch((err) => {
          res.status(400).json(err);
        });
    };

    // Obtenir la liste des options possibles

    module.exports.getOption = (req, res, next) => {
        
        Option.find()
        .sort({identifiant:1})
          .then((foundOption) => {
              //Aucune options trouvés
                foundOption.length === 0 && res.status(400).json({message : "Aucune options n'a été trouvé"})

                  res.status(200).json({
                    foundOption
                  });
                })
          .catch((err) => {
            res.status(400).json(err);
          });
      };