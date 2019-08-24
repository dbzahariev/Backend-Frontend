const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  Birthday: { type: Date, required: true },
  location: { type: String },
  company: { type: String },
  education: [
    {
      school: { type: String, require: true },
      from: { type: Date },
      to: { type: Date },
      description: { type: String }
    }
  ],
  social: {
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
