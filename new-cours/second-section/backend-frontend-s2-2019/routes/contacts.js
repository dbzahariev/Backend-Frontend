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
      // Create new contact
      const newContact = new Contact({ ...req.body, user: req.user.id });

      // Save Contact
      const contact = await newContact.save();

      // Return Contact to FE
      return res.json(contact);
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
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(400).json({ errors: [{ msg: "Contact not found" }] });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Not authorized" }] });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true }
    );

    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ errors: [{ msg: error.message, type: "Server error" }] });
  }
});

// @route       DELETE api/contacts/:id
// @desk        Delete contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(400).json({ errors: [{ msg: "Contact not found" }] });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Not authorized" }] });
    }

    await Contact.findByIdAndDelete(req.params.id);

    return res.json({ msg: "Contact is removed" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ errors: [{ msg: error.message, type: "Server error" }] });
  }
  res.send("Delete contact");
});

module.exports = router;
