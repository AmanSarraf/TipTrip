const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Places",
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Places",
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
      "business",
      "religious",
      "holiday",
      "adventure",
      "educational",
      "historical",
    ],
  },
  comment: {
    type: String,
  },
});

itinerarySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("trip", itinerarySchema);
