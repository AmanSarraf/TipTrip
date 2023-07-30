const itineraryRouter = require("express").Router();
const Place = require("../models/place");
const Itinerary = require("../models/itinerary");

itineraryRouter.get("/", async (request, response) => {
  const users = await Itinerary.find({});
  response.json(users);
});

itineraryRouter.post("/", async (request, response) => {
  // Check if user login
  const user = request.user;
  if (user === undefined) {
    return response.status(401).json({ error: "token invalid" });
  }

  // Add Itinerary
  const { dateFrom, dateTo, purpose, comment } = request.body;

  const source = request.body.source.toLowerCase();
  const destination = request.body.destination.toLowerCase();
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
    user: user.id,
  });

  const savedItinerary = await itinerary.save();

  // Save place
  const sourceSaved = await Place.findOne({ cityName: source });
  if (!sourceSaved) {
    const sourcePlace = new Place({
      cityName: source,
    });
    await sourcePlace.save();
  }

  const destinationSaved = await Place.findOne({ cityName: destination });
  if (!destinationSaved) {
    const destinationPlace = new Place({
      cityName: destination,
    });

    await destinationPlace.save();
  }

  user.itineraries = user.itineraries.concat(savedItinerary._id);
  await user.save();

  return response.status(201).json(savedItinerary);
});

module.exports = itineraryRouter;
