const mongoose = require('mongoose');

const UserImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  createdDate: { type: Date, required: true },
});

const UserImage = mongoose.model('UserImage', UserImageSchema);

module.exports = UserImage;