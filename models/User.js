const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  id: { type: Number, unique: true },
  general: {
    citizenship_code: String,
    gender: String,
    currentLocation: String,
    phone: String,
  },
  professionalOverview: {
    profession: Number,
    yearsOfExp: Number,
    openToDiffRole: Boolean,
    preferenceToWork: [Number],
    skillRank: [
      { skillId: Number, yearsOfExp: Number },
    ],
  },
  relocation: {
    openToRemote: Boolean,
    relocateOptions: String,
    cadSalaryExpect: Number,
    canadianVisa: Number,
    usdSalaryExpect: Number,
    validPassport: Boolean,
    companySize: [String],
    activelyLooking: Boolean,
    noticePeriod: Number,
  },
  social: [
    { name: String, url: String }
  ]
});

module.exports = mongoose.model('User', UserSchema);