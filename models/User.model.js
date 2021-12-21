//Modèle User

const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      validate: [isEmail, "Please , enter a valid email"],
      unique: [true, "Email should be unique"],
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    password: {
      type: String,
      require: [true, "Password is required."],
    },
    role: {
      require: [true, "Role is required. (ADMIN, CLIENT)"],
        type: String,
        enum: ['CLIENT', 'ADMIN'],
        default: 'CLIENT',
        
      },
  
    lastConnection: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
