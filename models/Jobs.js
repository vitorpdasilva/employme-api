const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobsSchema = new Schema({
  id: { type: Number, unique: true },
  applicants: [String],
  recent: Boolean,
  createdAt: { type: Number, default: Date.now / 1000 },
  title: String,
  location: {
    city: String,
    country: String,
    province: String,
  },
  locationType: String,
  salary: {
    from: Number,
    to: Number,
    currency: String,
    period: String,
    description: String,
    tags: [String],
  }
});

module.exports = mongoose.model('jobs', JobsSchema);