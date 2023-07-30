const itineraryRouter = require("express").Router();
const Itinerary = require("../models/itinerary");

itineraryRouter.post("/", async (request, response) => {
  // Destructre fields from the request body
  const { source, destination, dateFrom, dateTo, purpose, comment } =
    request.body;

  // Check if All Details are there or not
  if (!source || !destination || !dateFrom || !dateTo || !purpose || !comment) {
    return response.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }
  if (source === destination) {
    return response.status(400).json({
      success: false,
      message: "Source And Destination Cannot Be Same.",
    });
  }
  if (dateFrom === dateTo) {
    return response.status(400).json({
      success: false,
      message: "Starting Date And Ending Date is not same.",
    });
  }
  const itinerary = await Itinerary.create({
    source,
    destination,
    dateFrom,
    dateTo,
    purpose: purpose,
    comment,
  });

  return response.status(200).json({
    success: true,
    itinerary,
    message: "Itinerary created successfully",
  });
});

module.exports = itineraryRouter;
