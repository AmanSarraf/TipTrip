const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const placeSchema = new mongoose.Schema({
  cityName: { type: String, unique: true },
  reviews: {
    type: [
      {
        user: { type: String, require: true },
        rating: { type: Number, require: true, min: 0, max: 5 },
        comment: { type: String },
      },
    ],
    default: [],
  },
  favourites: {
    type: Number,
    default: 0,
  },
});

placeSchema.plugin(uniqueValidator);

placeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Place", placeSchema);
