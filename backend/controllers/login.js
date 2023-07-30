const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    name: user.name,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);
  response.status(200).send({ token, email: user.email, name: user.name });
});

module.exports = loginRouter;