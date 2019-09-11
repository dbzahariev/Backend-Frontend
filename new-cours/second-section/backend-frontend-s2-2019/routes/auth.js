const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route       GET api/auth
// @desk        Get loged user
// @access      Private
router.get("/", auth, (req, res) => {
  res.send("Get loged user");
});

// @route       POST api/auth
// @desk        Auth user & get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log({ user });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ errors: [{ msg: error.message, type: "Server error" }] });
    }
  }
);

module.exports = router;
