const itineraryRouter = require("express").Router();
const Place = require("../models/place");
const Itinerary = require("../models/itinerary");

itineraryRouter.get("/", async (request, response) => {
  const users = await Itinerary.find({});
  response.json(users);
});

itineraryRouter.post("/", async (request, response) => {
  const user = request.user;
  if (user === null) {
    return response.status(401).json({ error: "token invalid" });
  }

  // Add Itinerary
  const { source, destination, dateFrom, dateTo, purpose, comment } =
    request.body;

  if (source === destination) {
    return response.status(400).json({
      error: "Source and Destination cannot be same",
    });
  }

  const itinerary = new Itinerary({
    source,
    destination,
    dateFrom,
    dateTo,
    purpose,
    comment,
    user: request.user.id,
  });

  const savedItinerary = await itinerary.save();

  // Save place
  const sourcePlace = new Place({
    cityName: source,
  });
  const destinationPlace = new Place({
    cityName: destination,
  });

  await sourcePlace.save();
  await destinationPlace.save();

  // Add itinerary in user
  // - - HERE - -
  return response.status(201).json(savedItinerary);
});

module.exports = itineraryRouter;
