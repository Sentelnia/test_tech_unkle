const Option = require("../models/Option.model");

//Créer une Option

//HandleError
const handleErrorOption = (err) => {
    let errors = {
      titleOption: "",
      description: ""
    };
  
    //duplicate error code
    if (err.code === 11000) {
      errors.titleOption = "that title is already registered";
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
    const { titleOption, description} = req.body;
    
    Option.create({
      titleOption,
      description
    })
      .then((option) => {

        res.status(201).json({ message: `L'option ${option.titleOption} a bien été créé`});
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
                  message: `L'option ${foundOption.title} a bien été supprimé`
                });
              })
        .catch((err) => {
          res.status(400).json(err);
        });
    };