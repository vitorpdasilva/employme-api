const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillListSchema = new Schema({
  id: { type: Number, unique: true },
  name: String,
});

module.exports = mongoose.model('skillList', SkillListSchema, 'skillList');