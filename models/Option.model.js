//Modèle Option

const { Schema, model } = require("mongoose");


const optionSchema = new Schema(
  {
    identifiant: {
      type: String,
      required: [true, "Identifiant is required."],
      unique: [true, "Identifiant is unique."],
    },
    description: {
        type: String,
        required: [true, "Description is required."]
      },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Option", optionSchema);