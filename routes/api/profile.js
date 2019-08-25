const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no profile for this user' }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error with message: ${err.message}`);
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('birthday', 'Please select birthday')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      birthday,
      location,
      company,
      skills,
      education,
      twitter,
      facebook,
      instagram
    } = req.body;

    // Fill in the fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (birthday) profileFields.birthday = birthday;
    if (location) profileFields.location = location;
    if (company) profileFields.company = company;
    if (skills)
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (education.length > 0) profileFields.education = education;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      // Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Server error with msg: ${err.message}`);
    }
  }
);

module.exports = router;
