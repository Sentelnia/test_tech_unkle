const Contrat = require("../models/Contrat.model.js");
const User = require("../models/Contrat.model.js");

const updateDbContrat = (req, res, next) => {
  Contrat.updateMany(
    { startDate: { $lt: new Date() } },
    { $set: { status: "active" } }
  )
    .then(() => {
      Contrat.updateMany(
        { endDate: { $lt: new Date() } },
        { $set: { status: "finished" } }
      )
        .then(() => {
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const updateDbContratClient = (req, res, next) => {
  const userId = res.locals.user._id || req.body.userId;

  Contrat.updateMany(
    { startDate: { $lt: new Date() }, clients: userId },
    { $set: { status: "active" } }
  )
    .then(() => {
      Contrat.updateMany(
        { endDate: { $lt: new Date() }, clients: userId },
        { $set: { status: "finished" } }
      )
        .then(() => {
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = { updateDbContrat, updateDbContratClient };
