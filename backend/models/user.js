const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    require: [true, "please enter a name"],
    maxlength: [40, "Name should be of 40 charecters"],
  },
  email: {
    type: String,
    require: [true, "please provide a email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "url_to_default_image", // You can set a default URL for the user's image here
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  itineraries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
    },
  ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
