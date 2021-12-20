//Modèle Option

const { Schema, model } = require("mongoose");


const optionSchema = new Schema(
  {
    titleOption: {
      type: String,
      required: [true, "Title is required."],
      unique: [true, "Title is unique."],
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