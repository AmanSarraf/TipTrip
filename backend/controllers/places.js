const placeRouter = require("express").Router();
const Place = require("../models/place");
const { userExtractor } = require("../utils/middleware");

placeRouter.get("/", async (request, response) => {
  const places = await Place.find({});
  response.json(places);
});

placeRouter.use(userExtractor);

placeRouter.put("/", async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: "token invalid" });
  }

  const { cityName, rating, comment } = request.body;
  if (!(cityName && rating)) {
    return response.status(400).json({ error: "Input city and rating" });
  }

  const user = request.user;

  let place = await Place.findOne({ cityName });

  console.log(place);
  console.log(user.reviews);

  user.reviews = user.reviews.filter(
    (review) => review.toString() !== place.id
  );

  console.log(user.reviews);
  if (!place) {
    return response.status(400).json({ error: "city not visited" });
  }

  if (place.reviews) {
    place.reviews = place.reviews.filter((review) => {
      review.email !== user.email;
    });
  }

  place.reviews = place.reviews.concat({
    userName: user.name,
    userEmail: user.email,
    rating,
    comment,
  });

  const updatedPlace = await Place.findOneAndReplace(
    { cityName },
    { cityName, reviews: place.reviews, favourites: place.favourites },
    {
      new: true,
      context: "query",
    }
  );

  user.reviews = user.reviews.concat(updatedPlace.id);
  user.save();
  response.status(201).json(updatedPlace);
});

module.exports = placeRouter;
