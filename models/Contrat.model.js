//Modèle Contrat

const { Schema, model } = require("mongoose");


const contratSchema = new Schema(
  {
    number: {
      type: Number,
      unique: [true , "number is unique"]
    },
    startDate: {
      type: Date,
      required: [true, "StartDate is required."],
    },
    endDate: {
      type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'finished'],
        default: 'pending',
      },
    resiliation : {
      type: Boolean,
      default : false
    },
    resiliationDate : {
      type:Date,
      default : Date.now()
    },
    options: 
        [
            { type: Schema.Types.Object, ref: "Options" }    
        ],
    clients:
    [
        {type: Schema.Types.Object, ref: "User" }
    ]
    
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contrat", contratSchema);