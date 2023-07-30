const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  purpose: {
    type: String,
    enum: [
      "",
      "business",
      "religious",
      "holiday",
      "adventure",
      "educational",
      "historical",
    ],
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

itinerarySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
