const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");

// @route       GET api/contacts
// @desk        Get all users contacts
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ errors: [{ msg: error.message, type: "Server error" }] });
  }
});

// @route       POST api/contacts
// @desk        Add new contact
// @access      Private
router.post(
  "/",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      return res.json(
        await new Contact({ ...req.body, user: req.user.id }).save()
      );
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ errors: [{ msg: error.message, type: "Server error" }] });
    }
  }
);

// @route       PUT api/contacts/:id
// @desk        Update contact
// @access      Private
router.put("/:id", auth, (req, res) => {
  res.send("Update contact");
});

// @route       DELETE api/contacts/:id
// @desk        Delete contact
// @access      Private
router.delete("/:id", auth, (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
