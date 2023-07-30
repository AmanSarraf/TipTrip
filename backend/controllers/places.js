const placeRouter = require("express").Router();
const Place = require("../models/place");

placeRouter.get("/", async (request, response) => {
  const places = await Place.find({});
  response.json(places);
});

module.exports = placeRouter;
