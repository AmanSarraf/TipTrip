const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  cityName: String,
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  reviews: [
    {
      user: { type: String, require: true },
      rating: { type: Number, require: true, min: 0, max: 5 },
      comment: { type: String },
    },
  ],
  favourites: {
    type: Number,
    default: 0,
  },
});

placeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Place", placeSchema);
