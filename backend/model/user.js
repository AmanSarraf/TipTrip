const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    require: [true, "please enter a name"],
    maxlength: [40, "Name should be of 40 charecters"],
  },
  email: {
    type: String,

    require: [true, "please provide a email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,

    require: [true, "please provide a password"],
    minlength: [3, "Password should be of min 3 charecter"],
    select: false, //by default password was also coming to body and we had to do {user.password=undefined}
  },
  image: {
    type: String,
    default: "url_to_default_image", // You can set a default URL for the user's image here
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  favourite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

//encrypt password before save:
userSchema.pre("save", async function (next) {
  // ! every time we update the schema bcrypt is running :(
  if (!this.isModified("password")) {
    return next(); // if password not modified keep on doing what you were doing
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//CREATE and RETURN JWT
userSchema.methods.getJwtToken = function () {
  jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forget password token
userSchema.methods.getForgotPasswordToken = function () {
  //generate a long and random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  //getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
