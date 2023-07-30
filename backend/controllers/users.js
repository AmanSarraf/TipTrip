const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.post("/", async (request, response) => {
  console.log("post route is running");
  const { name, email, password, gender } = request.body;
  if (name && email && password) {
    response.send("ok");
    console.log("your name is " + name);
  }
  if (!email || !name || !password) {
    return response.status(401).json({
      message: "please enter all fields",
    });
  }

  console.log(request.body);

  const user = await User.create({
    name,
    email,
    password,
    gender,
  });

  console.log(user);

  // const token = user.getJwtToken();
  // const options = {
  //   expiresponse: new Date(Date.now() + 3 * 20 * 60 * 60 * 1000),
  //   httpOnly: true,
  // };

  // response.status(200).cookie("token", token, options).json({
  //   sucess: true,
  //   token,
  //   user,
  // });
});

module.exports = userRouter;
