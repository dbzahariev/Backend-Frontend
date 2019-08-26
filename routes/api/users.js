const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
// @route   GET api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      user = new User({ name, email, avatar, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // TODO: Next line Return token. If you not wan to login automate remove next line. BUT return msg!!!
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server error with message: ${err.message}`);
    }
  }
);

// @route   DELETE api/user
// @desc    Delete user
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    let successMsg = [];
    let errorMsg = [];

    // Remove profile
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    if (profile) {
      successMsg.push({ msg: "Profile is Deleted" });
    } else {
      errorMsg.push({ msg: "Profile not found" });
    }

    // Remove user
    const user = await User.findOneAndRemove({ _id: req.user.id });
    if (user) {
      successMsg.push({ msg: "User is Deleted" });
    } else {
      errorMsg.push({ msg: "User not found" });
    }

    res.json({ msg: successMsg, errors: errorMsg });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error with message: ${err.message}`);
  }
});

module.exports = router;
