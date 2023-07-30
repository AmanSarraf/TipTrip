const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Places",
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Places",
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
      enum: ["Business", "Religious", "Holiday", "Adventure", "Educational", "Historical"],
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }

  }
);
module.exports = mongoose.model("trip", tripSchema);