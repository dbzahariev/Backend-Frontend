const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route       POST api/users
// @desk        Register user
// @access      Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("password", "password must be with min length 6 chars").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, date } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check user is already exist
      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: "Email is already exist" } });
      }

      // Create user by schema
      user = new User({ name, email, password, date });

      // Gen salt for password
      const salt = await bcrypt.genSalt(10);

      // Hashed password
      user.password = await bcrypt.hash(password, salt);

      // Save user in DB
      await user.save();

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
      console.error(error);
    }
  }
);

module.exports = router;
