const middleware = require("../utils/middleware");
const User = require("../model/user");

exports.signup = middleware.bigPromise(async (req, res) => {
  console.log("post route is running");
  const { name, email, password, gender } = req.body;
  if (name && email && password) {
    res.send("ok");
    console.log("your name is " + name);
  }
  if (!email || !name || !password) {
    return res.status(401).json({
      message: "please enter all fields",
    });
  }

  console.log(req.body);

  const user = await User.create({
    name,
    email,
    password,
    gender,
  });

  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 20 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
});
