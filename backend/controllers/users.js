const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

userRouter.post("/", async (request, response) => {
  console.log("post route is running");
  const { name, email, password, gender } = request.body;

  if (email == null || name == null || password == null || gender == null) {
    return response.status(400).json({
      message: "Please enter all fields",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    email,
    passwordHash,
    gender,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
