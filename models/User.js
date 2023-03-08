const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  picture: String,
  passwordHash: String,
  id: { type: String, unique: true },
  accessCount: Number,
  jobsApplied: [Number],
  general: {
    citizenship_code: String,
    gender: String,
    currentLocation: String,
    phone: String,
    bio: String,
  },
  professionalOverview: {
    profession: Number,
    yearsOfExp: Number,
    openToDiffRole: Boolean,
    preferenceToWork: [Number],
    skillRank: [
      { skillId: Number, yearsOfExp: Number },
    ],
    workExperience: [
      { title: String, company: String, location: String, startDate: Date, endDate: Date, description: String },
    ]
  },
  education: [
    { school: String, degree: String, fieldOfStudy: String, startDate: Date, endDate: Date, description: String },
  ],
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