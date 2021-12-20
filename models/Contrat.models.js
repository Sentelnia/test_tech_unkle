//Modèle Contrat

const { Schema, model } = require("mongoose");


const contratSchema = new Schema(
  {
    number: {
      type: Number,
      required: [true, "Number is required."]
    },
    startDate: {
      type: Date,
      required: [true, "StartDate is required."],
    },
    endDate: {
      type: Date,
      require: [true, "EndDate is required."],
    },
    status: {
      require: [true, "Status is required. (ADMIN, CLIENT)"],
        type: String,
        enum: ['En cours de validation', 'Validé'],
        default: 'En cours de validation',
      },
    options: 
        [
            { type: Schema.Types.Object, ref: "Options" }
           
        ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contrat", contratSchema);