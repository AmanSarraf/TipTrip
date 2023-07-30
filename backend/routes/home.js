const express = require("express");
const router = express.Router();

const { home } = require("../controller/homeController");

//what happens when someone visit get route : this is where we bring controller
router.route("/").get(home);

module.exports = router;
