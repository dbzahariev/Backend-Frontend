const express = require("express");
const router = express.Router();

// @route       GET api/auth
// @desk        Get loged user
// @access      Private
router.get("/", (req, res) => {
  res.send("Get loged user");
});

// @route       POST api/auth
// @desk        Auth user & get token
// @access      Public
router.post("/", (req, res) => {
  res.send("Login user");
});

module.exports = router;
